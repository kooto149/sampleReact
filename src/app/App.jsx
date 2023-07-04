import FallbackLoader from '@components/loder/FallbackLoader';
import { Routes, Route,useNavigate } from 'react-router-dom';
import Header from '@pages/Header'
import Main from '@pages/Main'
import SamplePage from '@pages/SamplePage'
import NotFound from '@pages/NotFound'
import Bottom from '@pages/Bottom'
import Util from '@pages/Util'
import StringUtil from '@pages/StringUtil'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Suspense} from 'react';
const App = () => {
	const navigate = useNavigate();
	window.navigate = navigate;

  return (
    <Suspense fallback={<FallbackLoader />}>			
				<Header />
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="/SamplePage/*" element={<SamplePage />}></Route>
					<Route path="/Util/*" element={<Util />}></Route>
					<Route path="/StringUtil/*" element={<StringUtil />}></Route>
					{/* 일치하는 라우트가 없는경우 처리 */}
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
        <Bottom/>
    </Suspense>
  );
}
export default App;
