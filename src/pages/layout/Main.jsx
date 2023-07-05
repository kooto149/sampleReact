import React, { Fragment } from "react";
import { Link } from "react-router-dom";
function Main(){
    return (
        <Fragment>
            <h1>메인페이지</h1>
            <div>
                <ul>
                    <li onClick={movePage}>샘플페이지</li>
                    <Link to="/product/2"><li>2번상품</li></Link>
                </ul>
            </div>
        </Fragment>
    )
}

const movePage  = ()=>{
	window.navigate('/SamplePage',{});
}
export default Main;