"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet 기본 마커 아이콘 설정
const DefaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Place 인터페이스 정의
interface Place {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

const OpenStreetMapWithFilter: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("shelter");
  const [places, setPlaces] = useState<Place[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          initializeMap(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          const defaultLat = 37.5665;
          const defaultLng = 126.978;
          setLocation({ lat: defaultLat, lng: defaultLng });
          initializeMap(defaultLat, defaultLng);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      const defaultLat = 37.5665;
      const defaultLng = 126.978;
      setLocation({ lat: defaultLat, lng: defaultLng });
      initializeMap(defaultLat, defaultLng);
    }
  }, []);

  const initializeMap = (latitude: number, longitude: number) => {
    const mapInstance = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapInstance);

    L.marker([latitude, longitude])
      .addTo(mapInstance)
      .bindPopup("You are here.")
      .openPopup();

    setMap(mapInstance);
  };

  const searchPlaces = async () => {
    if (!map || !location) return;

    const encodedKeyword = encodeURIComponent(keyword);
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity~"${encodedKeyword}"](around:5000,${location.lat},${location.lng});out;`;

    try {
      const response = await fetch(overpassUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch Overpass API: ${response.status}`);
      }

      const data = await response.json();
      const fetchedPlaces: Place[] = data.elements.map((place: any) => ({
        name: place.tags.name || place.tags.amenity || "Unknown Place",
        address: `${place.lat}, ${place.lon}`,
        lat: place.lat,
        lng: place.lon,
      }));

      setPlaces(fetchedPlaces);

      fetchedPlaces.forEach((place) => {
        L.marker([place.lat, place.lng])
          .addTo(map)
          .bindPopup(`<b>${place.name}</b><br>${place.address}`);
      });
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const handleSearch = () => {
    if (location) {
      searchPlaces();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl p-6">
        <h1
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "#38ccae" }}
        >
          장소 검색과 필터링 (OpenStreetMap)
        </h1>
        <div className="flex justify-center items-center mb-6 space-x-4">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#38ccae]"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 text-white font-semibold rounded-full"
            style={{ backgroundColor: "#38ccae" }}
          >
            검색
          </button>
        </div>
        <div
          id="map"
          className="w-full h-96 border rounded-lg shadow-lg"
          style={{ border: `2px solid #38ccae` }}
        ></div>
        <ul className="mt-6 space-y-4">
          {places.length > 0 ? (
            places.map((place, index) => (
              <li
                key={index}
                className="p-4 border rounded-lg shadow-sm"
                style={{ border: `2px solid #38ccae` }}
              >
                <h3 className="text-lg font-bold" style={{ color: "#38ccae" }}>
                  {place.name}
                </h3>
                <p>{place.address}</p>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default OpenStreetMapWithFilter;
