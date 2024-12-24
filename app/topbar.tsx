import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Topbar() {
    return (
        <nav>
            <div className="font-PretendardVarible">
                <div className="flex justify-center w-full items-center p-[0.625rem]">
                    <div className="flex absolute flex-grow justify-center">
                        <Image src="icon.svg" alt="" width="50" height="49"/>
                        <span className="text-black text-5xl font-extralight pr-3 pl-2">Refugee</span>
                        <span className="text-[#009476] text-5xl font-extralight">Outreach Service</span>
                    </div>
                    <div className="flex w-full items-center justify-end h-full p-[0.625rem]">
                        <Link href="/signin" className="text-black textl-xl font-normal pr-[1.25rem]">회원가입</Link>
                        <Link href="/login" className="text-black textl-xl font-normal ">로그인</Link>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </nav>
    )
}