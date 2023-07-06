import { useState } from 'react';
import CalendarPicker from "@pages/components/CalendarPicker";
import Calendar from 'react-calendar';
import dayjs from 'dayjs';

import 'react-calendar/dist/Calendar.css';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';


function SamplePageCalendarPicker(){
    
    let today = new Date();
    let strToday = dayjs(today).format('YYYYMMDD');
    const [selDate, setSelDate] = useState(strToday);
    const [minDate, setMinDate] = useState('20230101');
    const [maxDate, setMaxDate] = useState('20231231');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // const dispatch = useDispatch();

    const onClickBUtton = ()=>{
        // let popupArgs = {
        //         isOpen: true,
        //         id: 'popup-calendar',
        //         content: () => (
        //             <CalendarPicker
        //                 defaultDateValue={dayjs(selDate)}
        //                 minDate={minDate}
        //                 maxDate={maxDate}
        //                 getValue={(value) => {
        //                     console.log('getValue::' + value)
        //                 }}
        //             />
        //         ),
        //         uiType: 'alert',
        //         align: 'center',
        //     };

            console.log('selDate::' + selDate)
            setModalIsOpen(true);

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
            <div id='divCal'></div>
            <Modal isOpen={modalIsOpen}
            appElement={document.getElementById('root')}
                    >
                        <button onClick={()=> setModalIsOpen(false)}>Close</button>

                        <Calendar onChange={(value) => {
                                console.log('getValue::' + value)
                            }} value={today} />
                    {/* <CalendarPicker
                            defaultDateValue={dayjs(selDate)}
                            minDate={dayjs(minDate)}
                            maxDate={dayjs(maxDate)}
                            getValue={(value) => {
                                console.log('getValue::' + value)
                            }}
                        /> */}
                    
                  </Modal>

             {/* <div>{this.state.bankInfo.bankNm}</div> */}
        </>
    );

}
export default SamplePageCalendarPicker;