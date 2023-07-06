import { all, fork } from 'redux-saga/effects';
import { shApiSaga } from '@modules/redux';

export default function* rootSaga() {
	yield all([fork(shApiSaga.watchSaga)]);
}
