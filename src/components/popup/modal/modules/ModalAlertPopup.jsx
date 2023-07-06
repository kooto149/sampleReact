import { useEffect, useRef } from 'react';
import { _ } from '@utils';
import { useModal, useA11Y } from '@modules/hooks';
import PropTypes from 'prop-types';
import ModalPopupStyle from '../ModalPopup.module.scss';

const ModalAlertPopup = ({
	isOpen = false,
	id = 'modal-alert-popup',
	title,
	content = null,
	align = 'left',
	onConfirm = { confirmClick: null, confirmBtnTitle: '확인' },
	closeBtn, // 추가 : 20220622 closeBtn prop 추가
	zIndex,
}) => {
	const { handleModalConfirmClick, modalCloseEvent } = useModal();
	const { confirmClick, confirmBtnTitle } = onConfirm;
	const { modalA11Y } = useA11Y(isOpen);
	const rootRef = useRef();
	const siblingRef = useRef({
		previous: undefined,
		next: undefined,
	});

	useEffect(() => {
		siblingRef.current = {
			previous: rootRef.current?.previousSibling,
			next: rootRef.current?.nextSibling,
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
						className={`${ModalPopupStyle['modal-popup-wrap']} ${ModalPopupStyle['alert']}`}
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
											`${ModalPopupStyle['desc']} ${ModalPopupStyle[align]}`,
										)}
									{typeof content !== 'function' &&
										typeof content !== 'string' &&
										content}
								</div>
							</div>
							<div className={ModalPopupStyle['popup-btn-wrap']}>
								<button onClick={() =>
										handleModalConfirmClick({
											confirmClick,
											uiType: 'alert',
										})
									}>확인</button>
							</div>
							{/* start : 추가 : 20220622 알럿 모달 X 아이콘 닫기 버튼 추가 */}
							{closeBtn && (
								<button>팝업닫기</button>
							)}
							{/* end : 추가 : 20220622 알럿 모달 X 아이콘 닫기 버튼 추가 */}
						</div>
					</div>
				)}
			</>
		)
	);
};

ModalAlertPopup.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	align: PropTypes.string,
	content: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.func,
		PropTypes.string,
	]),
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	onConfirm: PropTypes.shape({
		confirmClick: PropTypes.func,
		confirmBtnTitle: PropTypes.string,
	}),
	isOpen: PropTypes.bool,
	closeBtn: PropTypes.bool,
	zIndex: PropTypes.number,
};

export default ModalAlertPopup;
