import darkMode from './darkMode';
import themeBuilder from './themeBuilder';
import scroll from './scroll';
import parallax from './parallax';
import staggerChildren from './staggerChildren';
import chain from './chain';

const giftbag = () => {
	const methods = {
		darkMode,
		themeBuilder,
		scroll,
		parallax,
		staggerChildren,
		chain,
	};

	return methods;
};

export default giftbag;
