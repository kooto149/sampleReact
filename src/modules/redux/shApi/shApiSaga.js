/** ****************************************************************************************
 * @업무명   : modules > redux > shApi
 * @설명       : redux Saga 작성을 위한 예시
 ********************************************************************************************
 * 번호    작업자     작업일         JIRA            변경내용
 *-------------------------------------------------------------------------------------------
 * 1     남보라     2022-06-08      LEADSOL-3237     최초작성
 ********************************************************************************************/
import { call, put, takeLatest } from 'redux-saga/effects';
import { shApiSlice } from '@modules/redux';

const post = (payload) => {

};

const postSaga = function* (action) {
	try {
		const response = yield call(post, action.payload);

		if (response?.status === 200) {
			yield put(shApiSlice.actions.postSuccess(response.data));
		} else {
			yield put(shApiSlice.actions.postFail(response));
		}
	} catch (e) {
		yield put(shApiSlice.actions.postFail(e.response));
	}
};

const watchSaga = function* () {
	yield takeLatest(shApiSlice.actions.post.type, postSaga);
};

export default { watchSaga };
