import shCommon from "@commmons/shCommon"
function Main(){
    return (
        <>
            <h1>메인페이지</h1>
            <div>
                <ul>
                    <li onClick={movePage}>alert 컴포넌트 테스트</li>
                </ul>
            </div>
        </>
    )
}

const movePage  = ()=>{
	//window.navigate('/SamplePage',{});
    shCommon.showAlert(
        `alert테스트`,
    );
}
export default Main;