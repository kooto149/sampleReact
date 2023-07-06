import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modalPopupPortal: {
		isOpen: false,
		id: 'modal-popup',
		title: '',
		content: null,
		responseCode: '',
		children: null,
		onConfirm: { confirmClick: null, confirmBtnTitle: '' },
		onCancel: { cancelClick: null, cancelBtnTitle: '' },
		align: 'left',
		uiType: 'alert',
		customButton: null,
		customTitle: null,
		closeBtn: false,
		showChatbotIcon: false,
		onClickChatbot: null,
	}
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		modalPopupPortal: (state, action) => {
			state.modalPopupPortal = action.payload;
			const open = !!(action.payload.isOpen === undefined || action.payload.isOpen === true);

			state.modalPopupPortal.isOpen = open;
		},
		clearModalProp: () => initialState.modalPopupPortal,
		clearModalPropKey: (state, action) => {
			state.modalPopupPortal[action.payload] = initialState.modalPopupPortal[action.payload];
		}
	},
});

const modalActions = modalSlice.actions;
const modalReducer = modalSlice.reducer;

export { modalActions, modalReducer };
