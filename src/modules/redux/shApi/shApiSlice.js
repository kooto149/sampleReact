/** ****************************************************************************************
 * @업무명   : modules > redux > shApi
 * @설명       : redux Slice 작성을 위한 예시
 ********************************************************************************************
 * 번호    작업자     작업일         JIRA            변경내용
 *-------------------------------------------------------------------------------------------
 * 1     남보라     2022-06-08      LEADSOL-3237     최초작성
 ********************************************************************************************/
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	err: null,
	data: {
		body: {},
		header: {},
	},
	status: 200,
	statusText: '',
};

const slice = createSlice({
	name: 'shApi',
	initialState,
	reducers: {
		post: (state, action) => {
			state.loading = true;
		}, // view에서 호출
		postSuccess: (state, action) => {
			state.data = {};
			state.data.body = action.payload?.body ?? {};
			state.data.header = action.payload?.header ?? {};
			state.status = action.payload?.status;
			state.statusText = action.payload?.statusText ?? 'SUCCESS';
			state.loading = false;
		}, // saga에서 api 연결 성공시 return 값 적용
		postFail: (state, action) => {
			state.data = initialState.data;
			state.status = action.payload?.status ?? 500;
			state.statusText = action.payload?.statusText ?? 'Network Error';
			state.err = action.payload.err;
		}, // api 연결 실패시 return 값 적용
	},
});

const reducer = slice.reducer;
const actions = slice.actions;

export default { reducer, actions };
