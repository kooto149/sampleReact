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

	const [dateValue, setDateValue] = useState(dayjs(getDateFormatAsString(defaultDateValue)));

	// const checkDateInBoundary = (changeType, leftRight) => {
	// 	if (changeType === 'year') {
	// 		const minDateYear = dayjs(minDate).format('YYYY');
	// 		const maxDateYear = dayjs(maxDate).format('YYYY');
	// 		const currentDateValue = dateValue;

	// 		if (leftRight === 'left') {
	// 			if (`${currentDateValue.year() - 1}` < minDateYear) {
	// 				return false;
	// 			}
	// 		} else if (leftRight === 'right') {
	// 			if (`${currentDateValue.year() + 1}` > maxDateYear) {
	// 				return false;
	// 			}
	// 		}
	// 	} else if (changeType === 'month') {
	// 		const minDateYearMonth = dayjs(minDate).format(
	// 			'YYYY-MM',
	// 		);
	// 		const maxDateYearMonth = dayjs(maxDate).format(
	// 			'YYYY-MM',
	// 		);

	// 		const calcDateValue = dateValue
	// 			.add(leftRight === 'left' ? -1 : 1, 'month')
	// 			.format('YYYY-MM');

	// 		if (calcDateValue < minDateYearMonth || calcDateValue > maxDateYearMonth) return false;
	// 	}
	// 	return true;
	// };

	// const yearChange = (leftRight) => {
	// 	if (!checkDateInBoundary('year', leftRight)) return;
	// 	setDateValue(dateValue.add(leftRight === 'left' ? -1 : 1, 'year').set('date', 1));
	// };

	// const monthChange = (leftRight) => {
	// 	if (!checkDateInBoundary('month', leftRight)) return;
	// 	if (
	// 		(leftRight === 'left' && dateValue.month() - 1 === -1) ||
	// 		(leftRight === 'right' && dateValue.month() + 1 === 12)
	// 	)
	// 		return;
	// 	setDateValue(dateValue.add(leftRight === 'left' ? -1 : 1, 'month').set('date', 1));
	// };

	// useLayoutEffect(() => {
	// 	if (getValue) {
	// 		const isDayOff = !!(
	// 			dateValue.get('day') === 0 ||
	// 			dateValue.get('day') === 6 
	// 		);
	// 		const dateValueObject = {
	// 			dateValue: dateValue.format('YYYY-MM-DD'),
	// 			isDayOff,
	// 		};

	// 		getValue(dateValueObject);
	// 	}

	// 	const changedDate = dateValue.format('YYYY-MM-DD');

	// 	if (changedDate < minDate) {
	// 		setDateValue(dayjs(getDateFormatAsString(minDate)));
	// 	} else if (changedDate > maxDate) {
	// 		setDateValue(dayjs(getDateFormatAsString(maxDate)));
	// 	}
	// }, [dateValue, getValue, minDate, maxDate]);

	// const calendarValueChanged = (value) => {
	// 	setDateValue(dayjs(value));
	// };


	return (
		<div className='calendar-wrap'>
			<Calendar
				value={new Date(getDateFormatAsString(dateValue))}
				activeStartDate={new Date(getDateFormatAsString(dateValue))}
				// className='calendar-picker-area'
				locale="ko-KO"
				calendarType="US"
				formatDay={(locale, date) =>
					dayjs(date).format('D')
				}
				onChange={(value) => {
					// calendarValueChanged(value);
				}}
				minDate={new Date('2023-06-01')}
				maxDate={new Date(getDateFormatAsString(maxDate))}
				// tileClassName={({ date }) =>
				// 	dayOffArr.find(
				// 		(x) =>
				// 			x === dayjs(date).format('YYYY-MM-DD'),
				// 	) && 'react-calendar-dayOff'
				// }
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
	dayOffArr: array,
	showToday: bool,
	getValue: any,
};

export default CalendarPicker;
