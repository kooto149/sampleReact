import dayjs from 'dayjs';

/**
 * number 를 string 으로 변환한다 - 한자리 숫자일 경우 앞에 0을 붙여서 변환한다
 *
 * @param {number} num
 *
 * @returns string
 *
 * 확인
 */
const numberToString = (num: number) => {
	const numString: string = `${num}`;

	return numString.length < 2 ? `0${numString}` : numString;
};

/**
 * 해당 날짜의 요일 구하기
 *
 * @param date yyyy.mm.dd
 *
 * @returns String (0:일,1:월,2:화,3:수,4:목,5:금,6:토)
 *
 * 확인
 */
const sbWeekDay = (date: string) => {
	let rtnDate = '';
	let getDate = null;
	let dateArray = null;

	const week = new Array('일요일','월요일','화요일','수요일','목요일','금요일','토요일');

	if (date === null || date === '') {
		return null;
	}

	var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
	date = date.replace(reg,'');

	date = date.slice(0,4) + '.' + date.slice(4,6) + '.'  + date.slice(6,8);


	dateArray = date.split('.');

	getDate = new Date(
		parseInt(dateArray[0], 10),
		parseInt(dateArray[1], 10) - 1,
		parseInt(dateArray[2], 10),
	);

	rtnDate = week[getDate.getDay()]; // week[getDate.getDay()];

	return rtnDate;
};

/**
 * 윤년인지 체크한다.
 *
 * @param year
 *
 * @return boolean 윤년인지 여부
 *
 * 확인
 */
const sbIsLeapYear = (year: number) => {
	if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
		return true;
	} else {
		return false;
	}
};

/**
 * 말일을 구한다.
 *
 * @param year
 * @param month
 *
 * @return 입력한 년, 월의 말일값을 리턴한다.
 *
 * 확인
 */
const sbGetMonthLastDay = (year: number, month: number) => {
	const _month = parseFloat(month.toString()) - 1;
	const lastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// 윤년일때 2월을 29일로 바꾼다.
	if (sbIsLeapYear(year) === true) {
		lastDay[1] = 29;
	}

	return lastDay[_month];
};

/**
 * hhmiss 4자리가 들어오면 hh:mi 형식으로 리턴한다. hhmiss 6자리가 들어오면 hh:mi:ss 형식으로 리턴한다.
 *
 * @param {string} strTemp 원본 String
 *
 * @return {string} 변환된 문자열 리턴
 *
 * 확인
 */
const sbGetFormatTime = (strTemp: string = ''): string => {
	if (strTemp.length !== 4 && strTemp.length !== 6) return strTemp;

	let rtnValue = '';

	if (strTemp.length === 4) rtnValue = `${strTemp.substring(0, 2)}:${strTemp.substring(2, 4)}`;

	if (strTemp.length === 6)
		rtnValue = `${strTemp.substring(0, 2)}:${strTemp.substring(2, 4)}:${strTemp.substring(
			4,
			6,
		)}`;

	return rtnValue;
};

/**
 * 날짜 월, 일 한 자리수 체크
 *
 * @param number
 *
 * @returns String
 *
 * 확인
 */
const sbNumberCheck = (number: number) => {
	let _result = `${number}`;

	if (Number(number) < 10) {
		_result = `0${number}`;
	}

	return _result;
};

/**
 * 두날짜 간의 차이나는 날수를 리턴한다.
 *
 * @param startDate 2015.11.09 or 20151109 or date객체
 * @param endDate
 *
 * @returns days between 2 params.
 *
 * 확인
 */
const getDiffDate = (startDate: any, endDate: any) => {
	let d1;

	let d2;

	if (typeof startDate === 'string' && startDate.indexOf('.') > 0) {
		const tmp = startDate.split('.');

		d1 = new Date(Number(tmp[0]), Number(tmp[1]) - 1, Number(tmp[2])).valueOf();
	} else if (typeof startDate === 'string' && startDate.length === 8) {
		const tmp = [startDate.substr(0, 4), startDate.substr(4, 2), startDate.substr(6, 2)];

		d1 = new Date(Number(tmp[0]), Number(tmp[1]) - 1, Number(tmp[2])).valueOf();
	} else if (typeof startDate === 'object') {
		d1 = startDate.valueOf();
	}

	if (typeof endDate === 'string' && endDate.indexOf('.') > 0) {
		const tmp = endDate.split('.');

		d2 = new Date(Number(tmp[0]), Number(tmp[1]) - 1, Number(tmp[2])).valueOf();
	} else if (typeof endDate === 'string' && endDate.length === 8) {
		const tmp = [endDate.substr(0, 4), endDate.substr(4, 2), endDate.substr(6, 2)];

		d2 = new Date(Number(tmp[0]), Number(tmp[1]) - 1, Number(tmp[2])).valueOf();
	} else if (typeof startDate === 'object') {
		d2 = endDate.valueOf();
	}

	// return Math.abs( Math.round( (d2-d1)/1000/86400 -0.5 ) );
	return Math.round((d2 - d1) / 1000 / 86400 - 0.5);
};

/**
 * 시작일, 종료일 간의 개월수
 *
 * @param startDate
 * @param endDate
 *
 * @return
 *
 * 확인
 */
const getDiffeMonth = (startDate: string, endDate: string) => {
	let result = 0;

	const sYear = startDate.substring(0, 4);
	const eYear = endDate.substring(0, 4);
	const sMonth = startDate.substring(4, 6);
	const eMonth = endDate.substring(4, 6);

	result = (Number(eYear) - Number(sYear)) * 12 + (Number(eMonth) - Number(sMonth)) + 1;

	return result - 1;
};

/**
 * 오늘 날짜 구하기
 *
 * @returns year: number, month: string, day: string
 */
const getToday = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = `${date.getMonth() + 1}`;
	const day = `${date.getDate()}`;

	return {
		year,
		month: month.length === 1 ? `0${month}` : month,
		day: day.length === 1 ? `0${day}` : day,
	};
};

/**
 * 날짜 넣으면 날짜가 나온다. 없으면 오늘 날짜가 나온다.
 *
 * @param date
 *
 * @returns year.month.day
 */
const checkDate = (date: String) => {
	if (date === '' || date === undefined) {
		const today = getToday();

		return `${today.year}.${today.month}.${today.day}`;
	} else {
		const today = date.replace(/[^0-9]/gi, '');

		return `${today.slice(0, 4)}.${today.slice(4, 6)}.${today.slice(6)}`;
	}
};

/**
 * 생년월일 구하기
 *
 * @param sJumin1 : 실명번호 앞자리
 * @param sJumin2 : 실명번호 뒷자리 (1자리 or 7자리)
 *
 * @returns String 생년월일
 *
 * 확인
 */
const sbGetBirthByVal = (sJumin1: string, sJumin2: string) => {
	let sYearPreCode = '';
	let sYearBase = '';
	let sBirth = '';

	if (sJumin1.length !== 6 || sJumin1 === null || sJumin2 === null || sJumin2.length < 1) {
		return '0';
	}

	sYearPreCode = sJumin2.substring(0, 1);
	if (sYearPreCode === '9' || sYearPreCode === '0') {
		sYearBase = '18';
	} else if (sYearPreCode === '1' || sYearPreCode === '2') {
		sYearBase = '19';
	} else if (sYearPreCode === '3' || sYearPreCode === '4') {
		sYearBase = '20';
	} else {
		return '0';
	}

	sBirth = sYearBase + sJumin1;

	return sBirth;
};

/**
 * 날짜를 YYYY-MM-DD 형태나 YYYY/MM/DD HH:mm:ss 형태로 반환
 *
 * @param dateValue : 날짜 string 또는 Object (dayjs object 또는 Date)
 * @param displayTime : 시간까지 표시 여부 (false 경우 'YYYY-MM-DD', true 경우 'YYYY/MM/DD HH:mm:ss')
 *
 * @returns String 날짜
 */
const getDateFormatAsString = (dateValue: string | dayjs.Dayjs | Date, displayTime = false) => {
	let stringDateFormat = null;

	stringDateFormat = dayjs(dateValue).format(
		`${!displayTime ? 'YYYY-MM-DD' : 'YYYY/MM/DD HH:mm:ss'}`,
	);

	if (!stringDateFormat || stringDateFormat === 'Invalid Date') {
		return dayjs().format(`${!displayTime ? 'YYYY-MM-DD' : 'YYYY/MM/DD HH:mm:ss'}`);
	}
	return stringDateFormat;
};

const dateUtil00 = {
	numberToString,
	sbWeekDay,
	sbIsLeapYear,
	sbGetMonthLastDay,
	sbGetFormatTime,
	sbNumberCheck,
	getDiffDate,
	getDiffeMonth,
	getToday,
	checkDate,
	sbGetBirthByVal,
	getDateFormatAsString,
};

export default dateUtil00;