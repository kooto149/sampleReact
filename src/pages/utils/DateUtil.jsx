import { Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import {dateUtil} from '@utils';

function Util(){
    const [exam1V,setExam1] = useState(0);
    const exam1 = e=>{
        setExam1(dateUtil.numberToString())       
    }
    debugger
    return (
        <Fragment>
        <br />
            <Table striped="columns">
            <thead>
                <tr>
                <th>name</th>
                <th>description</th>
                <th>example</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>dateUtil.numberToString</td>
                    <td>랜덤 아이디 생성 : {exam1V}</td>
                    <td>
                        <button onClick={exam1}>
                            클릭
                        </button>
                    </td>
                </tr>
            </tbody>
            </Table>
        </Fragment>
      );
}
export default Util;