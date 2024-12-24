import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Topbar() {
    return (
        <nav>
            <div className="font-PretendardVarible">
                <div className="flex justify-center w-full items-center p-[0.625rem]">
                    <div className="flex flex-grow justify-center">
                        <Image src="icon.svg" alt="" width="50" height="49"/>
                        <span className="text-black text-5xl font-extralight pr-3 pl-2">Refugee</span>
                        <span className="text-[#009476] text-5xl font-extralight">Outreach Service</span>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex justify-between items-center w-2/3 pt-4">
                        <Link href="/news">뉴스</Link>
                        <Link href="/shelter">대피소 위치</Link>
                        <Link href="/call">비상 연락망</Link>
                        <Link href="/qna">Q&A</Link>
                        <Link href="/lang">언어</Link>
                        <Link href="/support">후원</Link>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </nav>
    )
}