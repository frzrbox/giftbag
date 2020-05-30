import giftbag from '../src'

const { themeBuilder, scroll, parallax, staggerChildren } = giftbag();

// Has to take in an intial value which will be the starting theme, unless a user had previously chosen a different theme
const siteThemeBuilder = themeBuilder({ initial: 'winter' });

const themeSelector = document.querySelector('.theme-selector');

// Set the initial value of the select with getCurrentTheme(), so that it will update with the local storage changes in case the page refreshes
themeSelector.value = siteThemeBuilder.getCurrentTheme()

// Dynamically change the theme using the setTheme method()
themeSelector.addEventListener('change', e => {
    siteThemeBuilder.setTheme(e.target.value);
})


// Parallax
const parallaxElements = document.querySelectorAll('.parallax-element')

parallaxElements.forEach(el => parallax({ el }))

// Stagger Children
const staggerParents = document.querySelectorAll('.stagger-children');

staggerParents.forEach(parent => {
    staggerChildren({
        parent: parent,
        animation: true,
        stagger: 0.05
    })
})

// Non giftbag code
const toggleItemsButton = document.querySelector('.toggle-items-button');
const itemsContainer = document.querySelector('.items-container');

toggleItemsButton.addEventListener('click', () => {
    itemsContainer.classList.toggle('visible');

    if (itemsContainer.classList.contains('visible')) {
        toggleItemsButton.textContent = 'Hide Me'
    } else {
        toggleItemsButton.textContent = 'Show Me'
    }
})