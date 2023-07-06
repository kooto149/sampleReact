import "bootstrap/dist/css/bootstrap.min.css";
import UtilStyle from "./Util.module.scss";
import { InputGroup, Button, Form } from "react-bootstrap";
import validationUtil00 from "@utils/basis/validationUtil00";
import { useState } from "react";

function ValidationUtil() {
  // 특수문자 공통함수 계산
  const calValidation = (val) => {
    const rs = validationUtil00.hasSpecialCharacter(val);
    return rs ? "true" : "false";
  };

  // 영문 대문자 공통함수 계산
  const calUpperCase = () => {};

  // 함수리스트(카드리스트) 컴포넌트
  const FunctionListComp = ({ title, description, calFunc }) => {
    const [inputValue, setInputValue] = useState();
    const [result, setResult] = useState();
    const calFuncBase = () => {
      setResult(calFunc(inputValue));
    };
    return (
      <>
        <div className={UtilStyle["fnList"]}>
          <p className={UtilStyle["fnTitle"]}>{title}</p>
          <span>{description}</span>
          <br />
          <hr></hr>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder=""
              aria-label=""
              aria-describedby="basic-addon1"
              onChange={(val) => {
                setInputValue(val.target.value);
              }}
            />
            <Button variant="outline-dark" onClick={calFuncBase}>
              확인
            </Button>
          </InputGroup>

          <br />
          <p>
            결과값: <span>{result}</span>
          </p>
        </div>
      </>
    );
  };

  return (
    <div className={UtilStyle["context"]}>
      {/* <div className={UtilStyle["fnList"]}>
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
      </div> */}
      {/* 위에 대신 아래! */}

      <FunctionListComp
        title={"hasSpecialCharacter"}
        description={"특수문자 유무 판단"}
        calFunc={calValidation}
      ></FunctionListComp>
      <FunctionListComp
        title={"hasUpperCase"}
        description={"영문 대문자 유무 판단"}
        calFunc={calUpperCase}
      ></FunctionListComp>
    </div>
  );
}

export default ValidationUtil;
