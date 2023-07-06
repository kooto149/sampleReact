import "bootstrap/dist/css/bootstrap.min.css";
import UtilStyle from "./Util.module.scss";
import { InputGroup, Button, Form } from "react-bootstrap";
import { useState } from 'react';
import {dateUtil} from '@utils';


function DateUtil(){
    const numberToString = (val) => {
        const rs = dateUtil.numberToString(val);
        return rs;
    }

    const sbWeekDay = (val) => {
        const rs = dateUtil.sbWeekDay(val);
        return rs;
    }

    const sbIsLeapYear = (val) => {
        const rs = dateUtil.sbIsLeapYear(val);
        return rs ? "true" : "false";
    }


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
                            onChange={(val)=>{
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
            <FunctionListComp
                title={"numberToString"}
                description={"string 으로 변환하기"}
                calFunc={numberToString}
            ></FunctionListComp>
            <FunctionListComp
                title={"weekDay"}
                description={"해당 날짜의 요일 구하기"}
                calFunc={sbWeekDay}
            ></FunctionListComp>
            <FunctionListComp
                title={"isLeapYear"}
                description={"윤년체크하기"}
                calFunc={sbIsLeapYear}
            ></FunctionListComp>
        </div>
    )
};

export default DateUtil;