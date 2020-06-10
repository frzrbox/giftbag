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
        el: '.menu-button',
        delay: 0.3,
        duration: 0.3,
        anim: {
            transformOrigin: ['center', 'center'],
            opacity: [0, 1],
            y: ['-30px', '0']
        }
    },
    {
        el: '.hero-title',
        duration: 0.5,
        anim: {
            x: ['50px', '0px'],
            opacity: [0, 1]
        }
    },
    {
        el: 'select',
        duration: 0.2,
        delay: 0.2,
        anim: {
            opacity: [0, 1],
            y: ['50px', 0]
        }
    }
]

const fadeInChain = chain(config)

fadeInChain.play();

const navConfig = [
    {
        el: 'nav',
        duration: 0.4,
        anim: {
            x: ['100%', '0%'],
            y: ['-100%', '0%']
        }
    }
    ,
    {
        el: 'nav ul',
        duration: 0.3,
        anim: {
            x: ['50px', 0],
            opacity: [0, 1]
        }
    }
]

const navChain = chain(navConfig);

// Non giftbag code
const menuButton = document.querySelector('.menu-button');

menuButton.addEventListener('click', () => {
    navChain.toggle();
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
