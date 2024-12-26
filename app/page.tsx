
export default function MainPage() {
    return (
        <div className="font-PretendardVarible">
            <div className="flex justify-center h-[70vh] bg-[#f5fbfa] w-full">
                <div className="flex flex-col justify-center">
                    <div>
                        <span className="text-[#1e1e1e] text-5xl font-bold pr-4">모든 난민이</span>
                        <span className="text-[#009476] text-5xl font-bold">자신의 모습</span>
                        <span className="text-[#1e1e1e] text-5xl font-bold">으로 살 수 있을 때까지</span>
                    </div>
                    <br/>
                    <br/>
                    <div className="text-black text-xl font-normal text-center font-PretendardVarible">
                        우리 웹사이트는 난민 및 이주민을 위한 종합적인 정보와 지원을 제공합니다.<br/>
                        이곳에서는 최신 난민 관련 뉴스와 정보를 쉽고 빠르게 확인할 수 있으며,<br/>
                        긴급 상황에 대비한 비상 연락처도 제공하고 있습니다.<br/><br/>
                        우리의 목표는 모든 난민이 필요한 정보를 손쉽게 얻고,<br/>
                        안전한 환경에서 새로운 시작을 할 수 있도록 지원하는 것입니다.<br/><br/>
                        함께 희망의 다리를 놓아주세요.
                    </div>
                </div>
            </div>
            <div>
                <h2 className=" text-black p-5 m-5 text-2xl font-normal font-PretendardVarible">그래프</h2><br/>
                {/*<Doughnut />*/}
            </div>
        </div>
    )
}