import { useState } from 'react';
import CalendarPicker from "@pages/components/CalendarPicker";
import dayjs from 'dayjs';
import 'react-calendar/dist/Calendar.css';
import { Button } from 'react-bootstrap';
import { store, modalActions } from '@modules/redux';


function SamplePageCalendarPicker(){
    
    let today = new Date();
    let strToday = dayjs(today).format('YYYYMMDD');
    const [selDate, setSelDate] = useState(strToday);
    const [minDate, setMinDate] = useState('20230101');
    const [maxDate, setMaxDate] = useState('20231231');
    const [resDate, setResDate] = useState('');
    const [resDateDisp, setResDateDisp] = useState('');

    const onClickBUtton = ()=>{
        console.log('selDate::' + selDate)

        store.dispatch(
            modalActions.modalPopupPortal({
                id:'calendarPicker',
                isOpen: true,
                uiType: "confirm",
                title:'calendar',
                content: () => (
                    <CalendarPicker
                        defaultDateValue={dayjs(selDate)}
                        minDate={dayjs(minDate)}
                        maxDate={dayjs(maxDate)}
                        getValue={(value) => {
                            console.log('getValue:' + JSON.stringify(value));
                            setResDate(value.dateValue);
                            console.log('resDate;;' + resDate)
                        }}
                    />
                ),
                onConfirm: {
                    confirmClick: () => {
                        console.log('confirmClick');
                        // debugger
                        // setResDateDisp(resDate);
                    },
                },
                onCancel: {
                    cancelClick: () => {
                        console.log('cancelClick');
                    },
                },
            }),
        );
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
            <br></br>
            <div id='divResult'>
                <span>결과 : </span>
                <input
                type='text'
                id="ipResult"
                value={resDate}
                readOnly={true}
            />
            </div>
        </>
    );

}
export default SamplePageCalendarPicker;