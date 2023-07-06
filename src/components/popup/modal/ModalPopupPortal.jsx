import { useModal } from '@modules/hooks';
import {
	ModalAlertPopup,
} from '@components';

export const ModalPopupPortal = () => {
	const {
		isOpen,
		id,
		title,
		content,
		responseCode,
		onConfirm,
		onCancel,
		align,
		uiType,
		customButton,
		customTitle,
		closeBtn,
		showChatbotIcon,
		onClickChatbot,
		zIndex,
	} = useModal().modalState.modalPopupPortal;
	let comp = null;

	if (uiType === "alert") {
		comp = (
			<ModalAlertPopup
				isOpen={isOpen}
				id={id}
				title={title}
				content={content}
				align={align}
				onConfirm={onConfirm}
				closeBtn={closeBtn}
				zIndex={zIndex}
			/>
		);
	}

	return comp;
};
