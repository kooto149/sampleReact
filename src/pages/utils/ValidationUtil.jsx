import "bootstrap/dist/css/bootstrap.min.css";
import UtilStyle from "./Util.module.scss";
import { InputGroup, Button, Form } from "react-bootstrap";
import validationUtil00 from "@utils/basis/validationUtil00";
import { useState } from "react";

function ValidationUtil() {
  const [inputValue, setInputValue] = useState();
  const [result, setResult] = useState();

  const calValidation = () => {
    console.log(inputValue);
    const rs = validationUtil00.hasSpecialCharacter(inputValue);
    if (rs) {
      setResult("true");
    } else {
      setResult("false");
    }
  };

  return (
    <div className={UtilStyle["context"]}>
      <div className={UtilStyle["fnList"]}>
        <p className={UtilStyle["fnTitle"]}>hasSpecialCharacter</p>
        <span>특수문자 유무 판단</span>
        <br />
        <hr></hr>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder=""
            aria-label=""
            aria-describedby="basic-addon1"
            onChange={(val) => {
              setInputValue(val.target.value);
              //console.log(inputValue);
            }}
          />
          <Button variant="outline-dark" onClick={calValidation}>
            확인
          </Button>
        </InputGroup>

        <br />
        <p>
          결과값: <span>{result}</span>
        </p>
      </div>
    </div>
  );
}

export default ValidationUtil;
