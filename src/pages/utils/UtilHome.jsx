import { Fragment } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

function UtilHome() {
  return (
    <>
      <br />
      <ButtonToolbar>
        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("stringUtil");
            }}
          >
            StringUtil
          </Button>
        </ButtonGroup>
        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("validationUtil");
            }}
          >
            validationUtil
          </Button>
        </ButtonGroup>
        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("dateUtil");
            }}
          >
            DateUtil
          </Button>
        </ButtonGroup>
        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("commonUtil");
            }}
          >
            CommonUtil
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </>
  );
}
const movePage = (pageNm) => {
  window.navigate("/" + pageNm, {});
};
export default UtilHome;
