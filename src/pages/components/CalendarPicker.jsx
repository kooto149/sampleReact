import { useState, useLayoutEffect } from 'react';
import { string, any, array, bool } from 'prop-types';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import 'react-calendar/dist/Calendar.css';


const CalendarPicker = ({    
	defaultDateValue,
	minDate,
	maxDate,
	getValue = null,
}) => {

	console.log(defaultDateValue, minDate, maxDate);
	
	const getDateFormatAsString = (dateValue, displayTime = false) => {
		let stringDateFormat = null;
	
		stringDateFormat = dayjs(dateValue).format(
			`${!displayTime ? 'YYYY-MM-DD' : 'YYYY/MM/DD HH:mm:ss'}`,
		);
	
		if (!stringDateFormat || stringDateFormat === 'Invalid Date') {
			return dayjs().format(`${!displayTime ? 'YYYY-MM-DD' : 'YYYY/MM/DD HH:mm:ss'}`);
		}
		return stringDateFormat;
	};

	////////////////////

	const [dateValue, setDateValue] = useState(dayjs(getDateFormatAsString(defaultDateValue)));

	useLayoutEffect(() => {
		if (getValue) {
			const isDayOff = !!(
				dateValue.get('day') === 0 ||
				dateValue.get('day') === 6 
			);
			const dateValueObject = {
				dateValue: dateValue.format('YYYY-MM-DD'),
				isDayOff,
			};

			getValue(dateValueObject);
		}

		const changedDate = dateValue.format('YYYY-MM-DD');

		if (changedDate < minDate) {
			setDateValue(dayjs(getDateFormatAsString(minDate)));
		} else if (changedDate > maxDate) {
			setDateValue(dayjs(getDateFormatAsString(maxDate)));
		}
	}, [dateValue, getValue, minDate, maxDate]);

	const calendarValueChanged = (value) => {
		setDateValue(dayjs(value));
	};

	return (
		<div className='calendar-wrap'>
			<Calendar
				value={new Date(getDateFormatAsString(dateValue))}
				// activeStartDate={new Date(getDateFormatAsString(dateValue))}
				locale="ko-KO"
				calendarType="US"
				formatDay={(locale, date) =>
					dayjs(date).format('D')
				}
				onChange={(value) => {
					calendarValueChanged(value);
				}}
				minDate={new Date(getDateFormatAsString(minDate))}
				maxDate={new Date(getDateFormatAsString(maxDate))}
				// tileDisabled={({ date }) =>
				// 	dayjs(getDateFormatAsString(date)).get('month') !==
				// 	dayjs(getDateFormatAsString(dateValue)).get('month')
				// }
			/>
		</div>
	);
};

CalendarPicker.propTypes = {
	defaultDateValue: any,
	minDate: any,
	maxDate: any,
	showToday: bool,
	getValue: any,
};

export default CalendarPicker;
