"use client";

//npm install puppeteer

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Article {
  title: string;
  link: string;
  imageUrl: string | null; // 이미지 URL 추가
}

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/news/api/crawl");
        if (!response.ok) {
          throw new Error("데이터를 가져오는 중 문제가 발생했습니다.");
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    
    <div className="text-center text-black text-[20px] font-medium mt-[1rem]">
      <div>
          <hr className="ml-auto mr-auto" />
      </div>
      <div className="text-center mt-[1rem] mb-[1rem]">
          <span className="text-black text-3xl font-medium font-PretendardVarible">뉴스 </span>
          <span className="text-[#009476] text-3xl font-medium font-PretendardVarible">on Refugees</span>
      </div>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {articles.map((article, index) => (
            <li key={index} style={{ marginBottom: "20px" }}>
              <Link href={article.link} target="_blank" rel="noopener noreferrer">
                <h2>{article.title}</h2>
              </Link>
              <hr className="mt-[0.25rem] mb-[0.25rem] w-[800px] ml-auto mr-auto" />
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  style={{ width: "300px", height: "auto", marginTop: "10px" }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsPage;
