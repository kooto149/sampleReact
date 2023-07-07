import { useNavigate } from "react-router-dom";
import {Header,Bottom} from "@layouts";
import RootRoute from "@routes/RootRoute";
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
        <RootRoute/>
      <Bottom />
      <ModalPopupPortal />
    </Suspense>
  );
};
export default App;
