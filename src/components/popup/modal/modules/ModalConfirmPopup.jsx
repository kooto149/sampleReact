import { useEffect, useRef } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import { _ } from '@utils';
import { useModal, useA11Y } from '@modules/hooks';
import ModalPopupStyle from '../ModalPopup.module.scss';

const ModalConfirmPopup = ({
	isOpen = false,
	id = 'modal-confirm-popup',
	title,
	content = null,
	align = 'left',
	onConfirm = { confirmClick: null, confirmBtnTitle: '확인' },
	onCancel = { cancelClick: null, cancelBtnTitle: '취소' },
	zIndex,
}) => {
	const { handleModalConfirmClick, handleModalCancelClick } = useModal();
	const { confirmClick, confirmBtnTitle } = onConfirm;
	const { cancelClick, cancelBtnTitle } = onCancel;
	const { modalA11Y } = useA11Y(isOpen);
	const rootRef = useRef();
	const siblingRef = useRef({
		previous: undefined,
		next: undefined,
	});

	useEffect(() => {
		siblingRef.current = {
			previous: rootRef.current.previousSibling,
			next: rootRef.current.nextSibling,
		};
	}, []);

	useEffect(() => {
		let _target = rootRef.current;

		if (isOpen) {
			modalA11Y.initFirstFocus(rootRef.current);
		} else {
			const siblingEl = siblingRef.current;

			_target = _.isElement(siblingEl.previous) ? siblingEl.previous : siblingEl.next;
		}

		modalA11Y.otherAriaHidden(_target);
	}, [isOpen, modalA11Y]);

	return (
		content && (
			<>
				{isOpen && (
					<div
						id={id}
						className={`${ModalPopupStyle['modal-popup-wrap']} ${ModalPopupStyle['confirm']}`}
						role="dialog"
						style={{ zIndex }}
						ref={rootRef}
					>
						<div className={ModalPopupStyle['dim']} aria-hidden="true"></div>
						<div className={ModalPopupStyle['popup-inner']}>
							{title && (
								<div className={ModalPopupStyle['popup-title']}>
									<strong className={ModalPopupStyle['title']}>{title}</strong>
								</div>
							)}
							<div className={ModalPopupStyle['scroll-wrap']}>
								<div className={ModalPopupStyle['popup-content']}>
									{typeof content === 'string' && (
										<p
											className={`${ModalPopupStyle['desc']} ${ModalPopupStyle[align]}`}
										>
											{content
												? content.split('\n').map((txt, brIndex) => (
														<span
															key={`popup-content-0${brIndex + 1}`}
															className="text-break"
														>
															{txt}
														</span>
												  ))
												: content}
										</p>
									)}
									{typeof content === 'function' &&
										content(
											`${ModalPopupStyle['desc']}}  ${ModalPopupStyle[align]}`,
										)}
									{typeof content !== 'function' &&
										typeof content !== 'string' &&
										content}
								</div>
							</div>
							<div className={ModalPopupStyle['popup-btn-wrap']}>
								<button
									onClick={() =>
										handleModalCancelClick({
											cancelClick,
											uiType: 'confirm',
										})
									}
								>
									{cancelBtnTitle === null || _.trim(cancelBtnTitle) === ''
										? '취소'
										: cancelBtnTitle}
								</button>
								<button
									onClick={() =>
										handleModalConfirmClick({
											confirmClick,
											uiType: 'confirm',
										})
									}
								>
									{confirmBtnTitle === null || _.trim(confirmBtnTitle) === ''
										? '확인'
										: confirmBtnTitle}
								</button>
							</div>
						</div>
					</div>
				)}
			</>
		)
	);
};

ModalConfirmPopup.propTypes = {
	id: PropTypes.string,
	title: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.func,
		PropTypes.string,
	]),
	content: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.func,
		PropTypes.string,
	]),
	align: oneOf(['left', 'center']),
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	onConfirm: PropTypes.shape({
		confirmClick: PropTypes.func,
		confirmBtnTitle: PropTypes.string,
	}),
	onCancel: PropTypes.shape({
		cancelClick: PropTypes.func,
		cancelBtnTitle: PropTypes.string,
	}),
	isOpen: PropTypes.bool,
	zIndex: PropTypes.number,
};

export default ModalConfirmPopup;
