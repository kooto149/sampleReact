import Nav from 'react-bootstrap/Nav';

function Header(){
    return (
        <Nav justify variant="tabs" defaultActiveKey="Main">
            <Nav.Item>
                <Nav.Link eventKey="Main"  onClick={movePage}>홈</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="Util"  onClick={movePage}>유틸</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="Component"  onClick={movePage}>컴포넌트</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="SamplePage"  onClick={movePage}>샘플페이지</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}
const movePage  = e =>{
    let btnNm = e.target.getAttribute("data-rr-ui-event-key");
    debugger
    if(btnNm === "Main"){
        btnNm = "";
    }
	window.navigate(`/${btnNm}`,{});
}
export default Header