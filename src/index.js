import darkMode from './darkMode'
import themeBuilder from './themeBuilder'
import scroll from './scroll'
import parallax from './parallax'
import staggerChildren from './staggerChildren'

const giftbag = () => {
    const methods = {
        darkMode,
        themeBuilder,
        scroll,
        parallax,
        staggerChildren
    }

    return methods
}

module.exports = giftbag;