import { Routes, Route, useNavigate } from "react-router-dom";
import {Header,Main,NotFound,Bottom} from "@layouts";
import {UtilHome,StringUtil,DateUtil,CommonUtil,ValidationUtil} from "@pageutils";
import Component from "@pages/components/ComponentHome";
import {SamplePageHome,SamplePageCalendarPicker} from "@samplePages";
import { Suspense } from "react";
import {ModalPopupPortal,FallbackLoader} from '@components';

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  const navigate = useNavigate();
  window.navigate = navigate;

  return (
    <Suspense fallback={<FallbackLoader />}>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/SamplePage/*" element={<SamplePageHome />}></Route>
        <Route path="/SamplePageCalendarPicker/*" element={<SamplePageCalendarPicker />}></Route>
        <Route path="/Util/*" element={<UtilHome />}></Route>
        <Route path="/StringUtil/*" element={<StringUtil />}></Route>
        <Route path="/DateUtil/*" element={<DateUtil />}></Route>
        <Route path="/ValidationUtil/*" element={<ValidationUtil />}></Route>
        <Route path="/CommonUtil/*" element={<CommonUtil />}></Route>
        <Route path="/Component/*" element={<Component />}></Route>
        {/* 일치하는 라우트가 없는경우 처리 */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Bottom />
      <ModalPopupPortal />
    </Suspense>
  );
};
export default App;
