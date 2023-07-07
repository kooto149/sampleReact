import "bootstrap/dist/css/bootstrap.min.css";
import UtilStyle from "./Util.module.scss";
import { InputGroup, Button, Form } from "react-bootstrap";
import { useState } from 'react';
import {dateUtil} from '@utils';


function DateUtil(){
    const numberToString = (val) => {
        if(val.input != null){
            const rs = dateUtil.numberToString(val.input);
            return rs;
        }else{
            return false;
        }
    }

    const sbWeekDay = (val) => {
        if(val.input != null){
            const rs = dateUtil.sbWeekDay(val.input);
            return rs;
        }else{
            return false;
        }
    }

    const sbIsLeapYear = (val) => {
        const rs = dateUtil.sbIsLeapYear(val.input);
        return rs ? "true" : "false";
    }

    const sbGetMonthLastDay = (val) => {
        if(val.input != null){
            const year = (val.input).substring(0,4);
            const month = (val.input).substring(4,6);
            const rs = dateUtil.sbGetMonthLastDay(year, month);
            return rs;
        }else{
            return false;
        }
    }

    const sbGetFormatTime = (val) => {
        if(val.input != null){
            const rs = dateUtil.sbGetFormatTime(val.input);
            return rs;
        }else{
            return false;
        }
    }

    const getDiffDate = (val) => {
        if(val.startDt != null && val.endDt != null){
            const rs = dateUtil.getDiffDate(val.startDt, val.endDt);
            return rs;
        }else{
            return false;
        }
    }
    const getDiffeMonth = (val) => {
        if(val.startDt != null && val.endDt != null){
            const rs = dateUtil.getDiffeMonth(val.startDt, val.endDt);
            return rs;
        }else{
            return false;
        }
    }

    const getToday = () => {
        let rs = dateUtil.getToday();
        rs = rs.year + "년" + rs.month + "월" + rs.day + "일";
        return rs;
    }

    const checkDate = (val) => {
        if(val.input != null){
            const rs = dateUtil.checkDate(val.input);
            return rs;
        }else{
            return false;
        }
    }

    // const sbGetBirthByVal = (val) => {
    //     if(val != null){
    //         const rs = dateUtil.sbGetBirthByVal(val.num1, val.num2);
    //         return rs;
    //     }else{
    //         return false;
    //     }
    // }

    


    const FunctionListComp = ({ title, description, calFunc, inputTitArr }) => {
        //const [inputValue, setInputValue] = useState();
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
                                <InputGroup className="mb-3" key={`tmp${idx}`}>
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
            <FunctionListComp
                title={"numberToString"}
                description={"string 으로 변환하기"}
                calFunc={numberToString}
                inputTitArr={[{ title: "input" }]}
            ></FunctionListComp>
            <FunctionListComp
                title={"weekDay"}
                description={"해당 날짜의 요일 구하기"}
                calFunc={sbWeekDay}
                inputTitArr={[{ title: "input" }]}
            ></FunctionListComp>
            <FunctionListComp
                title={"isLeapYear"}
                description={"윤년체크하기"}
                calFunc={sbIsLeapYear}
                inputTitArr={[{ title: "input" }]}
            ></FunctionListComp>
            <FunctionListComp
                title={"sbGetMonthLastDay"}
                description={"말일 구하기"}
                calFunc={sbGetMonthLastDay}
                inputTitArr={[{ title: "input" }]}
            ></FunctionListComp>
            <FunctionListComp
                title={"sbGetFormatTime"}
                description={"시간형태 반환하기"}
                calFunc={sbGetFormatTime}
                inputTitArr={[{ title: "input" }]}
            ></FunctionListComp>
            <FunctionListComp
                title={"getDiffDate"}
                description={"시작일, 종료일 간의 일수 반환하기"}
                calFunc={getDiffDate}
                inputTitArr={[
                    { title: "startDt", placeholder: "시작날짜" },
                    { title: "endDt", placeholder: "종료날짜" },
                ]}
            ></FunctionListComp>
            <FunctionListComp
                title={"getDiffeMonth"}
                description={"시작일, 종료일 간의 개월수 반환하기"}
                calFunc={getDiffeMonth}
                inputTitArr={[
                    { title: "startDt", placeholder: "시작날짜" },
                    { title: "endDt", placeholder: "종료날짜" },
                ]}
            ></FunctionListComp>
            <FunctionListComp
                title={"getToday"}
                description={"오늘 날짜 구하기"}
                calFunc={getToday}
            ></FunctionListComp>
            <FunctionListComp
                title={"checkDate"}
                description={"날짜 포맷 및 오늘날짜 반환"}
                calFunc={checkDate}
                inputTitArr={[{ title: "input" }]}
            ></FunctionListComp>
            {/* <FunctionListComp
                title={"sbGetBirthByVal"}
                description={"생년월일 반환하기"}
                calFunc={sbGetBirthByVal}
                inputTitArr={[
                    { title: "num1", placeholder: "실명번호 앞자리" },
                    { title: "num2", placeholder: "실명번호 뒷자리(1자리 or 7자리)" },
                ]}
            ></FunctionListComp> */}
            
        </div>
    )
};

export default DateUtil;