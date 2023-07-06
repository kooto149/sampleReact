import { modalActions } from '@modules/redux';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useModal = () => {
	const modalState = useSelector((state) => state.modal);

	const dispatch = useDispatch();

	const handleModalPopup = useCallback(
		(popupArgs) => {
			dispatch(modalActions.modalPopupPortal(popupArgs));
		},
		[dispatch],
	);

	const handleFullPopup = useCallback(
		(popupArgs) => {
			try {
				if (!popupArgs.id) {
					//popupArgs.id = _.uniqueId('fullPopupWrapper');
				}

				if (typeof popupArgs.isOpen !== 'boolean' && popupArgs.isOpen === undefined) {
					popupArgs.isOpen = true;
				}

				const popupElement = document.getElementById(popupArgs.id);

				if (!popupElement) {
					
					dispatch(modalActions.fullPopup({ [popupArgs.id]: popupArgs }));
				} else if (popupElement && !popupArgs.isOpen) {
					// 닫을경우 별도의 로직 필요시 이부분이 기입

					dispatch(modalActions.fullPopup({ [popupArgs.id]: popupArgs }));
				}
			} catch (ex) {
				
			}
		},
		[dispatch],
	);

	// 열려진 팝업 모두 닫기
	const handleFullPopupRemove = useCallback(() => {
		try {
			dispatch(modalActions.fullPopup({ remove: true }));
		} catch (ex) {
			
		}
	}, [dispatch]);

	// 모달팝업 닫기 이벤트
	const modalCloseEvent = useCallback(
		(uiType) => {
			handleModalPopup({
				isOpen: false,
				uiType,
			});
		},
		[handleModalPopup],
	);

	// 모달팝업 확인버튼클릭할때 발생시킬 이벤트
	const handleModalConfirmClick = useCallback(
		({ confirmClick, uiType }) => {
			modalCloseEvent(uiType);
			confirmClick && confirmClick();
		},
		[modalCloseEvent],
	);

	// 모달팝업 취소와 닫을때 발생시킬 이벤트
	const handleModalCancelClick = useCallback(
		({ cancelClick, uiType }) => {
			modalCloseEvent(uiType);
			cancelClick && cancelClick();
		},
		[modalCloseEvent],
	);

	return {
		modalState,
		handleModalPopup,
		handleFullPopup,
		handleFullPopupRemove,
		handleModalConfirmClick,
		handleModalCancelClick,
		modalCloseEvent,
	};
};

export default useModal;
