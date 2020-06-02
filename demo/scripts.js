import giftbag from '../src'

const { themeBuilder, scroll, chain, parallax, staggerChildren } = giftbag();

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

// Scroll
const scrollElements = document.querySelectorAll('.scroll-element');

scrollElements.forEach(el => {
    scroll({
        el
    })
});

// Chain

const config = [
    {
        element: 'nav',
        duration: 1,
        from: {
            x: '100%',
        },
        to: {
            x: 0
        }
    },
    {
        element: 'nav ul',
        duration: 0.4,
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    }
]


// Non giftbag code
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('nav')

menuButton.addEventListener('click', () => {

    nav.classList.toggle('active');

    if (nav.classList.contains('active')) {
        chain(config, 'normal');
    } else {
        chain(config, 'reverse')
    }
})

const toggleItemsButton = document.querySelector('.toggle-items-button');
const itemsContainer = document.querySelector('.items-container');

toggleItemsButton.addEventListener('click', () => {
    itemsContainer.classList.toggle('visible');

    if (itemsContainer.classList.contains('visible')) {
        toggleItemsButton.textContent = 'Hide Me'
    } else {
        toggleItemsButton.textContent = 'Show Me'
    }
});
