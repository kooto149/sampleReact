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
  const calUpperCase = (val) => {
    const rs = validationUtil00.hasUpperCase(val);
    return rs ? "true" : "false";
  };

  // 영문 대문자 공통함수 계산
  const calLowerCase = (val) => {
    const rs = validationUtil00.hasLowerCase(val);
    return rs ? "true" : "false";
  };

  const sampleInputTwo = (val) => {
    return JSON.stringify(val);
  };

  const sampleInputNo = () => {
    return "input없는 결과";
  };

  // 함수리스트(카드리스트) 컴포넌트
  // inputTitArr = [{title: '', placeholder:''}, ]
  const FunctionListComp = ({ title, description, calFunc, inputTitArr }) => {
    debugger;
    const [inputValue, setInputValue] = useState();
    const [inputValue2, setInputValue2] = useState({});
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

          {inputTitArr && inputTitArr.length > 0 ? (
            inputTitArr.map((item, idx) => {
              return (
                <>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id={idx}>{item.title}</InputGroup.Text>
                    <Form.Control
                      key={idx}
                      placeholder={item.placeholder}
                      aria-label=""
                      aria-describedby={idx}
                      onChange={(val) => {
                        setInputValue2((prev) => {
                          return {
                            ...prev,
                            [item.title]: val.target.value,
                          };
                        });

                        setInputValue(inputValue2);
                      }}
                    />
                  </InputGroup>
                </>
              );
            })
          ) : (
            <InputGroup className="mb-3">
              {/* <InputGroup.Text id="basic-addon1">{}</InputGroup.Text>
              <Form.Control
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
                onChange={(val) => {
                  setInputValue(val.target.value);
                }}
              /> */}
            </InputGroup>
          )}

          <div style={{ textAlign: "right" }}>
            <Button variant="outline-dark" onClick={calFuncBase}>
              확인
            </Button>
          </div>

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
        inputTitArr={[{ title: "문자열" }]}
      ></FunctionListComp>
      <FunctionListComp
        title={"hasUpperCase"}
        description={"영문 대문자 유무 판단"}
        calFunc={calUpperCase}
        inputTitArr={[{ title: "문자열" }]}
      ></FunctionListComp>
      <FunctionListComp
        title={"hasLowerCase"}
        description={"영문 소문자 유무 판단"}
        calFunc={calLowerCase}
        inputTitArr={[{ title: "문자열" }]}
      ></FunctionListComp>

      <FunctionListComp
        title={"sample"}
        description={"input이 두개~"}
        calFunc={sampleInputTwo}
        inputTitArr={[
          { title: "startDt", placeholder: "시작날짜" },
          { title: "endDt", placeholder: "종료날짜" },
        ]}
      ></FunctionListComp>

      <FunctionListComp
        title={"sample"}
        description={"input이 XX"}
        calFunc={sampleInputNo}
      ></FunctionListComp>
    </div>
  );
}

export default ValidationUtil;
