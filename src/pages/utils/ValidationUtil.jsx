import "bootstrap/dist/css/bootstrap.min.css";
import UtilStyle from "./Util.module.scss";
import { InputGroup, Button, Form } from "react-bootstrap";
import validationUtil00 from "@utils/basis/validationUtil00";
import { useState } from "react";

function ValidationUtil() {
  // 특수문자 공통함수 계산
  const calValidation = (val) => {
    const rs = validationUtil00.hasSpecialCharacter(val.input);
    return rs ? "true" : "false";
  };

  // 영문 대문자 공통함수 계산
  const calUpperCase = (val) => {
    const rs = validationUtil00.hasUpperCase(val.input);
    return rs ? "true" : "false";
  };

  // 영문 대문자 공통함수 계산
  const calLowerCase = (val) => {
    const rs = validationUtil00.hasLowerCase(val.input);
    return rs ? "true" : "false";
  };

  // 8자리 생일 유효성 판단
  const calBirth8 = (val) => {
    const rs = validationUtil00.birth(val.input);
    return rs ? "true" : "false";
  };

  // 6자리 생일 유효성 판단
  const calBirth6 = (val) => {
    const rs = validationUtil00.birth6digits(val.input);
    return rs ? "true" : "false";
  };

  // 전화번호 첫번째 자리수 체크
  const calTelNoHead = (val) => {
    const rs = validationUtil00.isTelNoHead(val.input1, val.input2);
    return rs ? "true" : "false";
  };

  // 전화번호 유효성 체크
  const calTelNo = (val) => {
    const rs = validationUtil00.isTelNo(val.input1, val.input2);
    return rs ? "true" : "false";
  };

  // 샘플
  // const sampleInputTwo = (val) => {
  //   return JSON.stringify(val);
  // };

  // const sampleInputNo = () => {
  //   return "input없는 결과";
  // };

  let contextArr = [];
  contextArr = [
    {
      title: "hasSpecialCharacter",
      description: "특수문자 유무 판단",
      calFunc: calValidation,
      inputTitArr: [{ title: "input" }],
    },
    {
      title: "hasUpperCase",
      description: "영문 대문자 유무 판단",
      calFunc: calUpperCase,
      inputTitArr: [{ title: "input" }],
    },
    {
      title: "hasLowerCase",
      description: "영문 소문자 유무 판단",
      calFunc: calLowerCase,
      inputTitArr: [{ title: "input" }],
    },
    {
      title: "birth",
      description: "8자리 생일 유효성 판단",
      calFunc: calBirth8,
      inputTitArr: [{ title: "input" }],
    },
    {
      title: "birth6digits",
      description: "6자리 생일 유효성 판단",
      calFunc: calBirth6,
      inputTitArr: [{ title: "input" }],
    },
    {
      title: "isTelNoHead",
      description: "전화번호 첫번째 자릿수 체크",
      calFunc: calTelNoHead,
      inputTitArr: [
        { title: "input1", placeholder: "전화번호 첫번째 자리" },
        {
          title: "input2",
          placeholder: "0: 전체, Type 1: 휴대폰, 2: 일반지역번호",
        },
      ],
    },
    {
      title: "isTelNo",
      description: "전화번호 유효성 판단",
      calFunc: calTelNo,
      inputTitArr: [
        { title: "input1", placeholder: "전화번호 전체" },
        {
          title: "input2",
          placeholder: "0: 전체, Type 1: 휴대폰, 2: 일반지역번호",
        },
      ],
    },
  ];

  // 함수리스트(카드리스트) 컴포넌트
  // inputTitArr = [{title: '', placeholder:''}, ]
  const FunctionListComp = ({ title, description, calFunc, inputTitArr }) => {
    const [inputValue2, setInputValue2] = useState({});
    const [result, setResult] = useState();
    const calFuncBase = () => {
      setResult(calFunc(inputValue2));
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
                <InputGroup className="mb-3" key={`group${idx}`}>
                  <InputGroup.Text id={`title${idx}`}>
                    {item.title}
                  </InputGroup.Text>
                  <Form.Control
                    key={`text${idx}`}
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
                    }}
                  />
                </InputGroup>
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
      {contextArr.map((item, idx) => {
        return (
          <FunctionListComp
            key={`funclist${idx}`}
            title={item.title}
            description={item.description}
            calFunc={item.calFunc}
            inputTitArr={item.inputTitArr}
          ></FunctionListComp>
        );
      })}

      {/* 샘플↓
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
      ></FunctionListComp> */}
    </div>
  );
}

export default ValidationUtil;
