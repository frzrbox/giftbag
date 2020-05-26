function darkMode({ wrapper, activeClass = "in-dark-mode", active = false, trigger }) {
    const allDarkModeElements = wrapper.querySelectorAll('*');

    function renderDarkMode() {
        // Logic behind rendering dark mode and setting local storage
        if (active) {
            document.body.setAttribute('data-dark-mode', true);
            allDarkModeElements.forEach(el => {
                el.classList.add(activeClass);
            });
            active = false;
            localStorage.setItem("dark-mode", "true");
        } else {
            allDarkModeElements.forEach(el => {
                document.body.removeAttribute("data-dark-mode");
                el.classList.remove(activeClass);
                active = true;
                localStorage.removeItem("dark-mode");
            })
        }
    }

    // Check if user was previously in darkmode
    let localDarkModeStatus = localStorage.getItem("dark-mode");

    if (localDarkModeStatus) {
        active = true
    }

    renderDarkMode();
    trigger.addEventListener('click', renderDarkMode)
}

const giftbag = () => {
    const methods = {
        log() {
            console.log('hello')
        },
        darkMode
    }

    return methods
}

module.exports = giftbag;