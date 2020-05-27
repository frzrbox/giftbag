import darkMode from './darkMode'
import themeBuilder from './themeBuilder'
import scroll from './scroll'
import parallax from './parallax'

const giftbag = () => {
    const methods = {
        log() {
            console.log('hello')
        },
        darkMode,
        themeBuilder,
        scroll,
        parallax
    }

    return methods
}

module.exports = giftbag;