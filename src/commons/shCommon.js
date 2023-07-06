
import { store, modalActions } from '@modules/redux';


/**
 * window.alert 대용
 *
 * @param {string} message
 * @param {Function | null} onConfirm
 * @param {string} title
 * @param {Boolean} promise 여부
 */
const showAlert = (message, onConfirm = null, title = '알림') => {
	let resolveFunc;

	store.dispatch(
		modalActions.modalPopupPortal({
			isOpen: true,
			uiType: "alert",
			title,
			content: message,
			onConfirm: {
				confirmClick: () => {
					onConfirm && onConfirm();
					resolveFunc(true);
				},
			},
		}),
	);

	return new Promise((res) => {
		resolveFunc = res;
	});
};

const shCommon = {
	showAlert,
};

export default shCommon;
