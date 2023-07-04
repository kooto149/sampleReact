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
 * 숫자가 있는지 없는지 판단
 *
 * @param v
 *
 * @returns
 *
 * 확인
 */
const hasNumber = (v: string) => {
	const regExp: RegExp = /[0-9]/g;

	return regExp.test(v);
};

/**
 * 적합한 문자열로 구성된 id 인지 확인
 *
 * @param idValue
 *
 * @returns
 *
 * 확인
 */
const id = (idValue: number) => {
	const regExp: RegExp = /^[A-Za-z0-9]{6,20}$/;

	return regExp.test(idValue.toString());
};

/**
 * 적합한 문자열로 구성된 password 인지 확인
 *
 * @param passwordValue
 *
 * @returns
 *
 * 확인
 */
const password = (passwordValue: string) => {
	//! 최소 8 자, 하나 이상의 대문자, 하나의 소문자, 하나의 숫자 및 하나의 특수 문자
	const regExp: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

	return regExp.test(passwordValue);
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

// todo: 주민번호 validation
/**
 * Resident Registration Number
 */
const rrn = () => {};

// todo: email domain validation
/**
 * 제대로 된 이메일 주소 도메인 형식인지
 *
 * @param v
 *
 * @returns
 *
 * 확인
 */
const email = (v: string) => {
	const regExp: RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

	return regExp.test(v);
};

const validationUtil00 = {
	hasSpecialCharacter,
	hasUpperCase,
	hasLowerCase,
	hasNumber,
	id,
	password,
	birth,
	birth6digits,
	rrn,
	email,
};

export default validationUtil00;
