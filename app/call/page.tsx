'use client'

import {useRouter} from "next/navigation";
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
    const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({ latitude: null, longitude: null });
    const [addressName, setAddressName] = useState<string | null>(null);

    useEffect(() => {
        // 현재 위치 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setLocation({ latitude, longitude });

                    // 주소 가져오기
                    fetchAddress(latitude, longitude);
                },
                (error) => {
                    console.error("Error getting location: ", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const fetchAddress = async (latitude: number, longitude: number) => {
        const REST_API_KEY = '6e955e90641acaf63ac4450dc80a0bd9'; // 여기에 실제 REST API 키를 입력하세요

        try {
            const response = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`, {
                method: 'GET',
                headers: {
                    Authorization: `KakaoAK ${REST_API_KEY}`,
                },
            });

            if (!response.ok) {
                throw new Error('네트워크 응답이 좋지 않습니다.');
            }

            const data = await response.json();
            const address = data.documents[0]?.road_address?.address_name || data.documents[0]?.address?.address_name;

            setAddressName(address);
        } catch (error) {
            console.error('주소를 가져오는 데 오류가 발생했습니다:', error);
        }
    };

    const router = useRouter()

    return (
        <div className="font-PretendardVarible">
            <div>
                <hr className="mt-[0.5rem] mb-[0.5rem] ml-auto mr-auto" />
            </div>
            <div className="flex justify-center mt-[1rem] text-center text-black font-normal">
                <input type="button" value="현재 위치" onClick={() => router.refresh()} className="w-[128px] h-[30px] bg-[#38ccae] active:bg-[#009476] rounded-[50px]"/>
                <span className="pt-[0.25rem] ml-[1rem] w-[521px] h-[30px] opacity-50 bg-[#d9d9d9]/80 rounded-[30px]">
                    {addressName ? (
                        <p>{addressName}</p>
                    ) : (
                        <p>주소를 로딩 중입니다...</p>
                    )}
                </span>
            </div>
            <div className="pt-[3.5rem] font-PretendardVarible">
                <table className="flex justify-center">
                    <thead>
                        <tr>
                            <th className="w-[200px] h-[30px]">
                                <input type="text" disabled={true} value="연락처" className="w-[85px] h-[30px] bg-[#38ccae] rounded-[50px] font-normal text-center"/>
                            </th>
                            <th className="w-[400px] h-[30px]">
                                <input type="text" disabled={true} value="설명" className="w-[85px] h-[30px] bg-[#38ccae] rounded-[50px] font-normal text-center"/>
                            </th>
                            <th className="w-[200px] h-[30px]">
                                <input type="text" disabled={true} value="주소" className="w-[85px] h-[30px] bg-[#38ccae] rounded-[50px] font-normal text-center"/>
                            </th>
                        </tr>
                    </thead>
                </table>
                <hr className="mt-[1rem] mb-[0.5rem] w-[900px] ml-auto mr-auto" />
                <table className="ml-auto mr-auto">
                    <tbody>
                        <tr>
                            <th className="w-[200px] font-normal">112</th>
                            <th className="w-[400px] font-normal">경찰서(범죄나 긴급 상황에서 경찰의 도움을 요청할 수 <br />있는 긴급 신고 전화번호)</th>
                            <th className="w-[200px] font-normal">-</th>
                        </tr>
                    </tbody>
                </table>
                <hr className="mt-[0.5rem] mb-[0.5rem] w-[900px] ml-auto mr-auto" />
                <table className="ml-auto mr-auto">
                    <tbody>
                        <tr>
                            <th className="w-[200px] font-normal">119</th>
                            <th className="w-[400px] font-normal">소방서(화재, 구조, 구급 등 긴급 상황에서 소방서의 도움을 <br />요청할 수 있는 신고 전화번호)</th>
                            <th className="w-[200px] font-normal">-</th>
                        </tr>
                    </tbody>
                </table>
                <hr className="mt-[0.5rem] mb-[0.5rem] w-[900px] ml-auto mr-auto" />
                <table className="ml-auto mr-auto">
                    <tbody>
                        <tr>
                            <th className="w-[200px] font-normal">1345</th>
                            <th className="w-[400px] font-normal">외국인 종합 안내센터(외국인의 국내 생활적응에 필요한 <br />민원상담과 행정정보 안내를 제공하는 전화번호)</th>
                            <th className="w-[200px] font-normal">경기도 과천시 관문로 47 정부과천청사</th>
                        </tr>
                    </tbody>
                </table>
                <hr className="mt-[0.5rem] mb-[0.5rem] w-[900px] ml-auto mr-auto" />
                <table className="ml-auto mr-auto">
                    <tbody>
                        <tr>
                            <th className="w-[200px] font-normal">02-2110-4143</th>
                            <th className="w-[400px] font-normal">이민통합과(한국 사회 적응과 자립을 지원하는 사회통합 <br />프로그램을 운영하는 전화번호) </th>
                            <th className="w-[200px] font-normal">경기도 과천시 관문로 47 정부과천청사</th>
                        </tr>
                    </tbody>
                </table>
                <hr className="mt-[0.5rem] mb-[0.5rem] w-[900px] ml-auto mr-auto" />
                <table className="ml-auto mr-auto">
                    <tbody>
                        <tr>
                            <th className="w-[200px] font-normal">02-2110-4160</th>
                            <th className="w-[400px] font-normal">난민정책과(난민 정책에 대한 도움과 난민의 처우 등 난민 <br />업무에 관한사항을 제공하는 전화번호)</th>
                            <th className="w-[200px] font-normal">경기도 과천시 관문로 47 정부과천청사</th>
                        </tr>
                    </tbody>
                </table>
                <hr className="mt-[0.5rem] mb-[0.5rem] w-[900px] ml-auto mr-auto" />
                <table className="ml-auto mr-auto">
                    <tbody>
                        <tr>
                            <th className="w-[200px] font-normal">02-2110-4174</th>
                            <th className="w-[400px] font-normal">난민심의과(난민불인정 및 난민인정 취소 또는 철회에 대한 <br />이의신청 심의에 관한 정보를 제공하는 전화번호)</th>
                            <th className="w-[200px] font-normal">경기도 과천시 관문로 47 정부과천청사</th>
                        </tr>
                    </tbody>
                </table>
                <hr className="mt-[0.5rem] mb-[0.5rem] w-[900px] ml-auto mr-auto" />
                <table className="ml-auto mr-auto">
                    <tbody>
                        <tr>
                            <th className="w-[200px] font-normal">02-2110-4143</th>
                            <th className="w-[400px] font-normal">이민통합과(한국 사회 적응과 자립을 지원하는 사회통합 <br />프로그램을 운영하는 전화번호) </th>
                            <th className="w-[200px] font-normal">경기도 과천시 관문로 47 정부과천청사</th>
                        </tr>
                    </tbody>
                </table>
                <hr className="mt-[0.5rem] mb-[0.5rem] w-[900px] ml-auto mr-auto" />
                <table className="ml-auto mr-auto">
                    <tbody>
                        <tr>
                            <th className="w-[200px] font-normal">02-2110-4108</th>
                            <th className="w-[400px] font-normal">외국인정책과(외국인 정책에 관한 정보를 제공하는 전화번호) </th>
                            <th className="w-[200px] font-normal">경기도 과천시 관문로 47 정부과천청사</th>
                        </tr>
                    </tbody>
                </table>
                <hr className="mt-[0.5rem] mb-[0.5rem] w-[900px] ml-auto mr-auto" />
                <table className="ml-auto mr-auto">
                    <tbody>
                        <tr>
                            <th className="w-[200px] font-normal">02-2110-4039</th>
                            <th className="w-[400px] font-normal">출입국심사과(출입국 규제 및 내/외국인 출구 심사에 관한 <br />정보를 제공하는 전화번호)</th>
                            <th className="w-[200px] font-normal">경기도 과천시 관문로 47 정부과천청사</th>
                        </tr>
                    </tbody>
                </table>
                <hr className="mt-[0.5rem] mb-[0.5rem] w-[900px] ml-auto mr-auto" />
                <table className="ml-auto mr-auto">
                    <tbody>    
                        <tr>
                            <th className="w-[200px] font-normal">02-773-7011</th>
                            <th className="w-[400px] font-normal">유엔난민기구(난민에게 필요한 법적 지원, 임시거처 등 <br />다양한 도움을 받을 수 있는 전화번호)</th>
                            <th className="w-[200px] font-normal">서울특별시 중구 퇴계로 110 5층</th>
                        </tr>
                    </tbody>
                </table>
                <hr className="mt-[0.5rem] mb-[0.5rem] w-[900px] ml-auto mr-auto" />
                <table className="ml-auto mr-auto">
                    <tbody>
                        <tr>
                            <th className="w-[200px] font-normal">02-773-0620</th>
                            <th className="w-[400px] font-normal">난민인권센터(난민과 관련된 정보를 제공하거나 심리 <br />상담등을 받을 수 있는 전화번호)</th>
                            <th className="w-[200px] font-normal">서울특별시 종로구 삼일대로 428 5층 500호</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="h-[10rem]"></div>
        </div>
    );
};

export default Home;
