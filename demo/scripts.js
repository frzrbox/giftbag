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
// let from = { opacity: 0, color: 'blue', transformOrigin: 'center', borderRadius: '5px', x: '20px', y: '50px' };
// let to = { opacity: 1, color: 'red', borderRadius: '10%', x: '0px', y: '0px' };



chain([
    {
        element: '.first',
        duration: 0.4,
        delay: 0.2,
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        },
    },
    {
        element: '.second',
        duration: 1,
        from: {
            opacity: 0,
            x: '500px'
        },
        to: {
            opacity: 1,
            x: 0
        }
    },
    {
        element: '.third',
        duration: 0.7,
        from: { scale: 1 },
        to: { scale: 2 }
    }
])



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