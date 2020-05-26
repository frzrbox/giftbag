import giftbag from '../src'

const { darkMode } = giftbag();

const darkModeWrapper = document.querySelector('.dark-mode-wrapper');
const darkModeToggle = document.querySelector('.dark-mode-toggle');

darkMode({
    wrapper: darkModeWrapper,
    trigger: darkModeToggle
})