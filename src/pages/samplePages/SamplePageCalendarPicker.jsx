import { useState } from 'react';
import CalendarPicker from "@pages/components/CalendarPicker";
import dayjs from 'dayjs';
import { Button } from 'react-bootstrap';
// import { modalActions } from '@modules/redux';
import { useDispatch } from 'react-redux';


function SamplePageCalendarPicker(){
    
    let today = new Date();
    let strToday = dayjs(today).format('YYYYMMDD');
    const [selDate, setSelDate] = useState(strToday);
    const [minDate, setMinDate] = useState('20230101');
    const [maxDate, setMaxDate] = useState('20231231');

    const dispatch = useDispatch();

    const onClickBUtton = ()=>{
        let popupArgs = {
                isOpen: true,
                id: 'popup-calendar',
                content: () => (
                    <CalendarPicker
                        defaultDateValue={dayjs(selDate)}
                        minDate={minDate}
                        maxDate={maxDate}
                        getValue={(value) => {
                            console.log('getValue::' + value)
                        }}
                    />
                ),
                uiType: 'alert',
                align: 'center',
            };

        dispatch(modalActions.modalPopupPortal(popupArgs));
    };

    return (
        <>
            <h3>CalendarPicker</h3>
            <br></br>
            <span>선택날짜 : </span>
            <input
                type='number'
                id="ipToday"
                defaultValue={selDate}
                onChange={(e)=>{setSelDate(e.target.value); console.log(selDate);}}
                name='선택날짜'
                // minLength='8'
                maxLength='8'
            />
            <span>     최소날짜 : </span>
            <input
                type='number'
                id="ipMinDate"
                defaultValue={minDate}
                onChange={(e)=>{setMinDate(e.target.value); console.log(selDate);}}
                name='최소날짜'
                // minLength='8'
                maxLength='8'
            />
            <span>     최대날짜 : </span>
            <input
                type='number'
                id="ipMaxDate"
                defaultValue={maxDate}
                onChange={(e)=>{setMaxDate(e.target.value); console.log(selDate);}}
                name='최대날짜'
                // minLength='8'
                maxLength='8'
            />
            <span>      </span>
            <Button
                onClick={onClickBUtton}
            >달력</Button>
             {/* <div>{this.state.bankInfo.bankNm}</div> */}
        </>
    );

}
export default SamplePageCalendarPicker;