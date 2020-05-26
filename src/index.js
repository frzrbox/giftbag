import darkMode from './darkMode'
import themeBuilder from './themeBuilder'

const giftbag = () => {
    const methods = {
        log() {
            console.log('hello')
        },
        darkMode,
        themeBuilder
    }

    return methods
}

module.exports = giftbag;