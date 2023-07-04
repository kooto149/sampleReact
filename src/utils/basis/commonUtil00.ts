/**
 * Object 가 가지고 있는 모든 하위 값value 들을 변경할 수 없게 만든다
 *
 * @param object
 *
 * @returns object
 *
 * 확인
 */
const deepFreeze = (object: any) => {
	// Retrieve the property names defined on object
	const propNames: string[] = Object.getOwnPropertyNames(object);

	// Freeze properties before freezing self

	for (const name of propNames) {
		const value: any = object[name];

		if (value && typeof value === 'object') {
			deepFreeze(value);
		}
	}

	return Object.freeze(object);
};

/**
 * 문자열에서 특정문자를 변환해서 리턴
 *
 * @param text
 *
 * @returns string
 *
 * 확인
 */
const escape = (text: string) => {
	let res = '';
	let i;

	for (i = 0; i < text.length; i++) {
		const c = text.charCodeAt(i);

		if (c < 256) res += encodeURIComponent(text[i]);
		else res += `%u${c.toString(16).toUpperCase()}`;
	}
	return res;
};

/**
 * 계좌번호마스킹: 4번째~7번째
 *
 * @param str 게좌번호
 *
 * 확인
 */
const sbMaskingAccountNo = (str: string | number, pattern: string = '●'): string => {
	let string: string = String(str);
	const p: string = pattern;

	if (!string) return string;

	if (string.indexOf('-') > -1) {
		if (string.length === 14) {
			return `${string.substring(0, 3)}-${p}${p}${p}-${p}${string.substring(9, 14)}`;
		} else if (string.length === 13) {
			return `${string.substring(0, 3)}-${p}${p}-${p}${p}${string.substring(9, 13)}`;
		}
	} else {
		if (string.length < 7) return string;
		string = `${string.substring(0, 3)}${p}${p}${p}${p}${string.substring(7, string.length)}`;
		return string;
	}

	return string;
};

/**
 * 전문수신 데이타가 vector형인 경우. 결과가 단건, 다건 이던지 항상 배열로 값 얻기.
 *
 * @param data 전문의 vector.data
 *
 * @returns Array
 *
 * 확인
 */
const sbGetJsonArray = (data: object) => {
	let list = [];

	if (Array.isArray(data)) {
		list = data;
	} else {
		list[0] = data;
	}

	return list;
};

/**
 * 전문수신 데이타에서 해당 key 데이타를 배열로 리턴.
 *
 * @param obj 전문수신 JSON 객체
 * @param key
 *
 * @returns Array
 *
 * 미확인
 */
const sbFindJsonArray = (obj: object, key: string) => {
	let list: Array<string | object> = [];

	for (const i in obj) {
		if (!Object.prototype.hasOwnProperty.call(obj, i)) {
			continue;
		}
		if (i === key) {
			list.push(obj[i as keyof object]);
		} else if (typeof obj[i as keyof object] === 'object') {
			list = list.concat(sbFindJsonArray(obj[i as keyof object], key));
		}
	}
	return list;
};

/**
 * 카드번호마스킹: 5번째~10번째 + 마지막 자리
 */
const sbMaskingCardNo = (string: string | number, pattern: string = '●'): string => {
	const p: string = pattern;
	const str: string = String(string);

	if (!str) return str;

	if (str.length === 16) {
		return `${str.substring(0, 4)}-${str.substring(4, 8)}-${p}${p}${p}${p}-${str.substring(
			12,
			16,
		)}`;
	}

	return str;
};

/**
 * 현재 WebView 를 반환
 *
 * @returns object
 *
 * 미확인
 */
const getCurView = () => {
	// return shComm.allIFrameFindByTypeToId(historyId);
};

/**
 * 동기 문법으로 코드 실행에 delay를 걸기 위한 함수 (`setTimeout` 대신 사용가능)
 *
 * @param {number} delayTime 딜레이 시킬 시간 (ms)
 * @return {Promise<any>} Promise 객체 (delayTime 시간 후 resolve)
 */
const delay = async (delayTime: number): Promise<any> =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, delayTime);
	});

const commonUtil00 = {
	deepFreeze,
	escape,
	sbGetJsonArray,
	sbFindJsonArray,
	sbMaskingCardNo,
	sbMaskingAccountNo,
	getCurView,
	delay,
};

export default commonUtil00;
