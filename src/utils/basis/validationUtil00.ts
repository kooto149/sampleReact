import _ from "lodash";

/**
 * 특수문자 @$!%*#?& 가 있는지 없는지 판단
 *
 * @param v
 *
 * @returns
 *
 * 확인
 */
const hasSpecialCharacter = (v: string) => {
	const regExp: RegExp = /[@$!%*#?&]/g;

	return regExp.test(v);
};

/**
 * 영문 대문자가 있는지 없는지 판단
 *
 * @param v
 *
 * @returns
 *
 * 확인
 */
const hasUpperCase = (v: string) => {
	const regExp: RegExp = /[A-Z]/g;

	return regExp.test(v);
};

/**
 * 영문 소문자가 있는지 없는지 판단
 *
 * @param v
 *
 * @returns
 *
 * 확인
 */
const hasLowerCase = (v: string) => {
	const regExp: RegExp = /[a-z]/g;

	return regExp.test(v);
};

/**
 * 제대로 된 8자리 생일 유형인지 판단
 *
 * @param birthValue
 *
 * @returns
 *
 * 확인
 */
const birth = (birthValue: number) => {
	const regExp: RegExp = /^[0-9]{8}$/;

	if (regExp.test(birthValue.toString())) {
		const birthStr: string = birthValue.toString();

		const year: number = Number(birthStr.substr(0, 4));
		const month: number = Number(birthStr.substr(4, 2));
		const day: number = Number(birthStr.substr(6, 2));
		const today: Date = new Date();
		const yearNow: number = today.getFullYear();

		if (year < 1900 || year > yearNow) {
			return false;
		} else if (month < 1 || month > 12) {
			return false;
		} else if (day < 1 || day > 31) {
			return false;
		} else if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
			return false;
		} else if (month === 2) {
			const isleap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

			if (day > 29 || (day === 29 && !isleap)) {
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	} else {
		return false;
	}
};

/**
 * 제대로 된 6자리 생일 유형인지 판단
 *
 * @param birthValue
 *
 * @returns
 *
 * 확인
 */

const birth6digits = (birthValue: string) => {
	const regExp = new RegExp(/^\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/g);

	return regExp.test(birthValue);
};

/**
 * 전화번호 첫번째 자릿수 체크
 *
 * @param str 전화번호 첫번째 자리
 * @param chkType 0: 전체, Type 1: 휴대폰, 2: 일반지역번호
 *
 * @returns 포맷이 적용된 전화번호
 *
 * 확인
 */
const isTelNoHead = (str: string, chkType: string) => {
	const head = _.trim(str);
	// const head = stringUtil01.sbGetStrValue(str);

	// 일반지역번호중 02 는 예외처리
	if (chkType === '0' || chkType === '2') {
		if (head === '02') {
			return true;
		}
	}

	if (head.length < 3) return false;

	const telNoHead00 =
		'010,011,016,017,018,019,02,031,032,033,041,042,043,044,051,052,053,054,055,061,062,063,064,070,080,0130,0303,0502,0504,0505,0506'; // 전체
	const telNoHead01 = '010,011,016,017,018,019'; // 휴대폰
	const telNoHead02 =
		'031,032,033,041,042,043,044,051,052,053,054,055,061,062,063,064,070,080,0130,0303,0502,0504,0505,0506'; // 지역번호

	if (chkType === '0') {
		if (telNoHead00.indexOf(head) === -1) {
			return false;
		} else {
			return true;
		}
	} else if (chkType === '1') {
		if (telNoHead01.indexOf(head) === -1) {
			return false;
		} else {
			return true;
		}
	} else if (chkType === '2') {
		if (telNoHead02.indexOf(head) === -1) {
			return false;
		} else {
			return true;
		}
	}

	return false;
};

/**
 * 전화번호 유효성 검증
 *
 * @param str 전화번호
 * @param chkType 0: 전체, Type 1: 휴대폰, 2: 일반지역번호
 *
 * @returns 전화번호 여부
 *
 * 확인
 */
const isTelNo = (str: string, chkType: string) => {
	// let sTelNo = stringUtil01.sbGetStrValue(str);
	let sTelNo =  _.trim(str);

	// sTelNo = stringUtil01.sbReplaceAll(sTelNo, '-');
	sTelNo = _.trim(str).replace(new RegExp('-', 'g'), '');

	if (!/^[0-9]*$/.test(sTelNo)) {
		return false;
	}

	// 지역번호 02 처리
	if (chkType === '0' || chkType === '2') {
		if (sTelNo.length < 9) return false;

		if (sTelNo.indexOf('02') === 0) return true;
	}

	if (sTelNo.length < 10) return false;

	if (isTelNoHead(sTelNo.substring(0, 3), chkType)) return true;
	else if (isTelNoHead(sTelNo.substring(0, 4), chkType)) return true;
	else return false;
};


const validationUtil00 = {
	hasSpecialCharacter,
	hasUpperCase,
	hasLowerCase,
	birth,
	birth6digits,
	isTelNoHead,
	isTelNo,
};

export default validationUtil00;
