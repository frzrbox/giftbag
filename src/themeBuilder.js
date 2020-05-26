export default function themeBuilder({ provider = document.body, initial }) {
    const localStorageStatus = localStorage.getItem('current theme');
    let currentTheme;

    // Set the current theme based off localstorage first, else set to initial
    if (localStorageStatus) {
        currentTheme = localStorageStatus
    } else {
        currentTheme = initial
    }

    provider.setAttribute('data-theme', currentTheme);
    localStorage.setItem('current theme', currentTheme);

    const methods = {
        setTheme(newValue) {
            currentTheme = newValue
            provider.setAttribute('data-theme', newValue);
            localStorage.setItem('current theme', newValue);
        },
        getCurrentTheme() {
            return currentTheme;
        }
    }

    return methods;
}
