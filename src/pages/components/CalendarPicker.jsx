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
	const [dateValue, setDateValue] = useState(dayjs(defaultDateValue));

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
	// 		setDateValue(dayjs(minDate));
	// 	} else if (changedDate > maxDate) {
	// 		setDateValue(dayjs(maxDate));
	// 	}
	// }, [dateValue, getValue, minDate, maxDate]);

	// const calendarValueChanged = (value) => {
	// 	setDateValue(dayjs(value));
	// };

	return (
		<div className='calendar-wrap'>
			<div className='calendar-date-area'>
				<div className='date-pick-top'>
					<div>
						<button
							type="button"
							// className={Styles.prev}
							// onClick={() => yearChange('left')}
						>
							<span className="hidden">이전년도</span>
						</button>
						<time dateTime={dateValue.year()}>{dateValue.year()}</time>
						<button
							type="button"
							// className={Styles.next}
							// onClick={() => yearChange('right')}
						>
							<span className="hidden">다음년도</span>
						</button>
					</div>
					<div>
						<button
							type="button"
							// className={Styles.prev}
							// onClick={() => monthChange('left')}
						>
							<span className="hidden">이전월</span>
						</button>
						<time
							dateTime={
								dateValue.month() + 1 < 10
									? `0${dateValue.month() + 1}`
									: dateValue.month() + 1
							}
						>
							{dateValue.month() + 1 < 10
								? `0${dateValue.month() + 1}`
								: dateValue.month() + 1}
						</time>
						<button
							type="button"
							// className={Styles.next}
							// onClick={() => monthChange('right')}
						>
							<span className="hidden">다음월</span>
						</button>
					</div>
				</div>
			</div>
			<Calendar
				value={new Date(dateValue)}
				activeStartDate={new Date(dateValue)}
				className='calendar-picker-area'
				locale="ko-KO"
				calendarType="US"
				formatDay={(locale, date) =>
					dayjs(date).format('D')
				}
				onChange={(value) => {
					// calendarValueChanged(value);
				}}
				minDate={new Date(minDate)}
				maxDate={new Date(maxDate)}
				// tileClassName={({ date }) =>
				// 	dayOffArr.find(
				// 		(x) =>
				// 			x === dayjs(date).format('YYYY-MM-DD'),
				// 	) && 'react-calendar-dayOff'
				// }
				tileDisabled={({ date }) =>
					dayjs(date).get('month') !==
					dayjs(dateValue).get('month')
				}
			/>
		</div>
	);
};

CalendarPicker.propTypes = {
	defaultDateValue: any,
	minDate: string,
	maxDate: string,
	dayOffArr: array,
	showToday: bool,
	getValue: any,
};

export default CalendarPicker;
