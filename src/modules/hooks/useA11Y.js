/** ****************************************************************************************
 * @업무명   : 접근성 관련 customHook
 * @설명     : 접근성 처리르 위한 함수로 해당 함수들은 프로그램의 실행에 영향을 주어서는 안되므로
 *            각 함수별로 전체를 try ~ catch로 처리 한다.
 ********************************************************************************************
 * 번호    작업자     작업일         JIRA            변경내용
 *-------------------------------------------------------------------------------------------
 * 1     김영우     2022-08-11                    최초작성
 ********************************************************************************************/
import { _ } from '@utils';
import { useEffect, useMemo, useState } from 'react';

const SELECTOR = {
	common: 'br,.hidden,[hidden],[aria-hidden=true]',
	close: '.drawerHeaderButton,.drawerHeaderButton *,[class*=icon-header-close_],[class*=icon-header-report_],[class*=icon-header-back_]',
};

Object.freeze(SELECTOR);

const ALL_SELECTOR = Object.values(SELECTOR).join(',');

/**
 * @description webview webkit 버전이 낮을 경우 not selector의 멀티 지정 안되므로 따로 구현해 줌.
 * @param {*} ele 검색을 진행 할 기준 element
 * @param {*} s 검색을 할 selector parttern
 * @returns 필터 된 element array
 */
const filterSelector = (ele, s) => {
	try {
		if (_.isElement(ele) && _.isString(s)) {
			try {
				Array.from(ele.querySelectorAll('*')).forEach((v) => {
					if (_.isElement(v)) {
						if (v.matches(s)) {
							v.setAttribute('a11y-focus', 'false');
						} else {
							v.removeAttribute('a11y-focus');
						}
					}
				});
				return ele;
			} catch (ex) {
				return undefined;
			}
		}
	} catch (ex) {
	}
	return undefined;
};

let _tId = 0;

/**
 * @description 해당 element 요소의 가장 하위 element를 반환함.
 * @param {*} ele 검색을 진행 할 기준 element
 * @returns 최하위 element
 */
const getTargetChildNode = (ele) => {
	let a11yFocus = true;

	try {
		a11yFocus = ele.getAttribute('a11y-focus') !== 'false';
	} catch (ex) {
	}
	try {
		if (_.isElement(ele) && a11yFocus && ele.hasChildNodes()) {
			let _childCnt = 0;

			try {
				_childCnt = Array.from(ele.childNodes).filter((v) => {
					const _a11yFocus = _.isElement(v) && v.getAttribute('a11y-focus') !== 'false';

					return _a11yFocus;
				}).length;
			} catch (ex0) {

			}

			if (_childCnt === 0) {
				return ele;
			} else if (_childCnt > 0) {
				let _findChild;
				const childList = Array.from(ele.childNodes);

				childList.some((_fcChild) => {
					_findChild = getTargetChildNode(_fcChild);

					return !_.isNil(_findChild);
				});
				return _findChild;
			} else {
				return undefined;
			}
		} else {
			return undefined;
		}
	} catch (ex) {

		return undefined;
	}
};

const useA11Y = (state) => {
	const [s, setS] = useState(state);

	useEffect(() => {
		setS(!!state);
	}, [state]);

	const modalA11Y = useMemo(() => {
		return {
			/**
			 * @description display 되는 modal의 처음 위치하는 element에 포커스를 옮김.
			 * @param {*} base modal root
			 * @returns void
			 */
			initFirstFocus: (base) => {
				if (_.isNumber(_tId) && _tId > 0) {
					clearTimeout(_tId);
					_tId = 0;
				}
				const _exec = () => {
					try {
						let _findChild;

						if (_.isElement(base)) {
							if (base.childElementCount === 0 && base.hasChildNodes()) {
								_findChild = base;
							} else {
								const _base = filterSelector(base, ALL_SELECTOR);
								const childList = Array.from(_base.childNodes);

								if (_.isArray(childList) && childList.length > 0) {
									childList.some((c) => {
										_findChild = getTargetChildNode(c);
										return _.isElement(_findChild);
									});
								}
							}

							if (_.isElement(_findChild)) {
								try {
									_findChild.setAttribute('tabindex', -1);
									_findChild.focus();
								} catch (ex) {
							
								}
							}
						}
					} catch (ex) {
						
					}
				};

				_tId = setTimeout(_exec, 500);

				return () => {
					if (_.isNumber(_tId) && _tId > 0) {
						clearTimeout(_tId);
						_tId = 0;
					}
				};
			},

			/**
			 * @description modal 외의 element 요소의 aria-hidden을 처리함.
			 * @param {*} base modal root
			 * @returns void
			 */
			otherAriaHidden: (base) => {
				try {
					const _target = [];
					let _rootElements = [];

					// 형제 노드 aria-hidden 처리
					let siblingEl = [];

					if (_.isElement(base)) {
						const _parent = base.parentElement;

						if (_parent !== document.body) {
							// 모든 sol-wrap aria-hidden 처리 ( potal 형식이 아닌 html 마크업 중간에서 오픈 될 경우를 위함 )
							_rootElements = Array.from(document.body.childNodes).filter((v) => {
								return (
									v.nodeType === 1 &&
									v !== document.getElementById('root') &&
									!['SCRIPT', 'NOSCRIPT'].includes(v.tagName)
								);
							});
						}

						siblingEl = Array.from(base.parentNode.childNodes).filter((v) => {
							return v.nodeType === 1 && !['SCRIPT', 'NOSCRIPT'].includes(v.tagName);
						});

						_target.push(...[..._rootElements, ...siblingEl]);

						if (_.isArray(_target) && _target.length > 0) {
							_target.forEach((wrap) => {
								if (_.isElement(wrap)) {
									wrap.removeAttribute('aria-hidden');
									if (s) {
										wrap.setAttribute('aria-hidden', 'true');
									}
								}
							});
						}
						if (_.isElement(base)) {
							base.removeAttribute('aria-hidden');
						}
					}
				} catch (ex) {
					
				}
			},
		};
	}, [s]);

	const carouselA11Y = useMemo(() => {
		return {
			/**
			 * @description carousel indicator 관련 접근성을 처리
			 * @param {*} slide 렌더링 된 carousel의 object
			 * @returns void
			 */
			indicator: (slide) => {
				try {
					if (slide) {
						const _pagination = slide.pagination;

						if (_.isObject(_pagination)) {
							const $el = _pagination.el;

							if (_.isElement($el)) {
								const _selector = Array.from(
									$el.querySelectorAll('[class*=swiper-pagination-current]'),
								);
								const _isPageIndicator =
									_.isArray(_selector) && _selector.length > 0;
								let totalCnt = '0';

								if (_.isElement($el)) {
									if (_isPageIndicator) {
										const totalSpanEl = $el.querySelector(
											'span[class*=custom-pagination-total]',
										);

										if (totalSpanEl) {
											totalCnt = totalSpanEl.innerText || '0';

											$el.setAttribute('role', 'img');
											$el.setAttribute(
												'aria-label',
												`총 ${totalCnt}개 페이지 중 ${
													slide.realIndex + 1
												}번째 페이지`,
											);
										}
									} else {
										const bullets = slide.pagination?.bullets;

										totalCnt = _.isArray(bullets) ? bullets.length : 0;

										if (_.isArray(bullets) && bullets.length > 0) {
											bullets.forEach((bullet) => {
												if (_.isElement(bullet)) {
													const dotIndex = Number(
														bullet.getAttribute('dot-index') || '0',
													);

													if (dotIndex === slide?.realIndex) {
														bullet.setAttribute(
															'aria-label',
															`선택됨, ${
																dotIndex + 1
															} 번째 페이지로 이동`,
														);
													} else {
														bullet.setAttribute(
															'aria-label',
															`${dotIndex + 1} 번째 페이지로 이동`,
														);
													}
												}
											});
										}

										$el.removeAttribute('role');
										$el.removeAttribute('aria-label');
									}
								}
							}
						}
					}
				} catch (ex) {
					
				}
			},
		};
	}, []);

	return {
		modalA11Y,
		carouselA11Y,
	};
};

export default useA11Y;
