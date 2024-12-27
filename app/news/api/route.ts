import puppeteer from "puppeteer";

export async function GET(req: Request) {
  const url = "https://www.bbc.com/korean/topics/cz74kjp9w6xt";

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const articles = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll("a"));
      return items
        .map((item) => {
          const title = item.innerText.trim();
          const link = item.href.startsWith("https")
            ? item.href
            : `https://www.bbc.com${item.getAttribute("href")}`;

          // 이미지 URL 추출 (다양한 속성 확인)
          const img = item.querySelector("img");
          const imageUrl =
            img?.getAttribute("src") ||
            img?.getAttribute("data-src") || // Lazy-load 이미지 속성
            img?.getAttribute("data-lazy-src") || // BBC가 사용하는 속성 확인
            img?.getAttribute("srcset")?.split(" ")[0] || // srcset의 첫 번째 URL 추출
            null;

          return { title, link, imageUrl };
        })
        .filter((article) => {
          const excludeKeywords = [
            "뉴스",
            "비디오",
            "라디오",
            "다운로드",
            "TOP 뉴스",
            "난민·망명신청자",
            "1",
            "2",
            "3",
            "4",
            "다음",
            "BBC News",
            "BBC 소개",
            "이용 약관",
            "개인정보취급방침",
            "쿠키정책",
            "고객센터",
            "Other Languages",
            "Do not share or sell my info",
            "© 2024 BBC",
            "외부 링크",
            "내용 보기",
            "본사 정책 보기",
          ];
          const isShort = article.title.length < 100;
          return (
            isShort &&
            !excludeKeywords.some((keyword) => article.title.includes(keyword))
          );
        })
        .slice(0, 17); // 최대 10개의 항목만 가져오기
    });

    console.log("크롤링된 데이터:", articles);

    await browser.close();

    return new Response(JSON.stringify({ articles }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Puppeteer 크롤링 실패:", error.message);

    return new Response(JSON.stringify({ error: "크롤링 중 오류 발생" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
