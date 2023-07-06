import { ReactComponent as SvgBack } from './icons-back.svg';
import { ReactComponent as SvgNext } from './icons-next.svg';
import { ReactComponent as SvgMenu } from './ic_menu_40_l_900.svg';
import { ReactComponent as SvgDown } from './ic_down_24_l_600.svg';
import { ReactComponent as SvgLinkBtn } from './link-button.svg';
import { ReactComponent as SvgLogin } from './login-download.svg';
import { ReactComponent as SvgLogout } from './logout-download.svg';

export const svgBack = (width, height, className) => (
	<SvgBack width={width} height={height} className={className} />
);

export const svgNext = (width, height) => <SvgNext width={width} height={height} />;

export const svgMenu = (width, height) => <SvgMenu width={width} height={height} />;

export const svgDown = (width, height) => <SvgDown width={width} height={height} />;

export const svgLinkBtn = (width, height, onClick, className) => (
	<SvgLinkBtn width={width} height={height} onClick={onClick} className={className} />
);

export const svgLogin = (width, height, className) => (
	<SvgLogin width={width} height={height} className={className} />
);
export const svgLogout = (width, height, className) => (
	<SvgLogout width={width} height={height} className={className} />
);

export default { svgBack, svgNext, svgMenu, svgDown, svgLinkBtn, svgLogin, svgLogout };
