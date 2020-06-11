# Giftbag

A lightweight library for quickly building animations

[View Demo](https://giftbagjs.com)<br/>

**Content** <br/>
[Dark Mode](#dark-mode)<br/>
[Theme Builder](#theme-builder)<br/>
[Parallax](#parallax)<br/>
[Scroll](#scroll)<br/>
[Stagger Children](#stagger-children)</br>
[Chain](#chain)<br/>

**Get Started** <br/>
`npm i giftbag`

## Dark Mode

The purpose of dark mode is to act as a toggle only between two themes, if you want to build mulitple different themes you can use the [Theme Builder](#theme-builder) api

**Dark Mode takes in an object of options to setup and initialize**
| Name        | Description                                                     | Default      | Optional |
| ----------- | --------------------------------------------------------------- | ------------ | -------- |
| wrapper     | The container of the dark mode animation                        | none         | required |
| activeClass | The class that will be applied to all children of the wrapper   | in-dark-mode | optional |
| active      | The initial state of dark mode                                  | false        | optional |
| trigger     | The element that will be used to toggle the dark mode animation | none         | required |

**Example**

```html
<header>
    <h1>Site Branding<h1>
    <button class="dark-mode-toggle">toggle</button>
</header>
<main class="dark-mode-wrapper">
	<section>
		<h3>I am a heading</h3>
	</section>
</main>
```

```js
import giftbag from "giftbag";
const { darkMode } = giftbag();

darkMode({
	wrapper: document.querySelector(".dark-mode-wrapper"),
	trigger: document.querySelector(".dark-mode-toggle"),
});
```

```css
:root {
	--dark-header-bg: black;
	--light-header-bg: white;
	--light-header-color: white;
	--dark-text: black;
	--light-text: white;
}

/* Elements that are not in the wrapper can still be styled by
accessing the "data-dark-mode" on the body */

header {
	background: var(--light-header-bg);
}

body[data-dark-mode="true"] header {
	background: var(--dark-header-bg);
	color: var(--light-header-color);
}

/* All children of the wrapper have access to the active class 
which is "in-dark-mode" by default */

h3 {
	color: var(--dark-text);
}

h3.in-dark-mode {
	color: var(--light-text);
}
```

## Theme Builder

Build multiple themes that can be toggled throughout your website

**Theme builder can take an object of the following options**
| Name     | Description                          | Default | Optional |
| -------- | ------------------------------------ | ------- | -------- |
| provider | The container of the theme animation | body    | optional |
| initial  | Set the default theme to start in    | none    | optional |

**Methods**
| name              | description                                           |
| ----------------- | ----------------------------------------------------- |
| setTheme()        | Allows you to change the theme throughout the website |
| getCurrentTheme() | Returns the current theme                             |

**Example**

```html
<body>
	<main class="container">
		<section>
			<h2>This is a theme</h2>
			<p
				>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, id vitae
				laborum pariatur quaerat quibusdam fugit laudantium facilis repellendus
				placeat quod numquam nam perspiciatis nulla. Aperiam minima tempora nam
				suscipit!</p
			>
		</section>

		<select class="theme-selector" id="" name="">
			<option value="initial">initial</option>
			<option value="summer">summer</option>
			<option value="fall">fall</option>
			<option value="spring">spring</option>
			<option value="winter">winter</option>
		</select>
	</main>
</body>
```

```js
// Has to take in an initial value which will be the starting theme, unless a user had previously chosen a different theme
const siteThemeBuilder = themeBuilder({ initial: "winter" });

const themeSelector = document.querySelector(".theme-selector");

// Set the initial value of the select with getCurrentTheme(), so that it will update with the local storage changes in case the page refreshes
themeSelector.value = siteThemeBuilder.getCurrentTheme();

// Dynamically change the theme using the setTheme() method
themeSelector.addEventListener("change", (e) => {
	siteThemeBuilder.setTheme(e.target.value);
});
```

```css
body {
	margin: 0;
	padding: 0;
	--background: white;
	--color: black;
}

body[data-theme="winter"] {
	--background: blue;
	--color: white;
}

body[data-theme="summer"] {
	--background: orange;
	--color: black;
}

body[data-theme="fall"] {
	--background: brown;
	--color: white;
}

body[data-theme="spring"] {
	--background: green;
	--color: black;
}

.container {
	background: var(--background);
	color: var(--color);
}
```

## Parallax

Create and customize multi layered parallax effects

**Customize parallax with an object of options**
| name | description                          | optional |
| ---- | ------------------------------------ | -------- |
| el   | target parallax element              | required |
| ease | easing the element will animate with | optional |

**Element attributes**
| name                    | description                           | default  |
| ----------------------- | ------------------------------------- | -------- |
| data-parallax-speed     | speed and direction of the parallax   | 0        |
| data-parallax-direction | orientation the parallax will animate | vertical |

- `data-parallax-speed` - positive values animate from left / right or top / bottom, while negative values will do the opposite. The higher the value the faster the speed.
- `data-parallax-direction` - either `horizontal` or `vertical`

**Example**

```html
<section>
	<h3
		class="parallax-element"
		data-parallax-direction="horizontal"
		data-parallax-speed="0.5"
		>Parallax</h3
	>
	<h3
		class="parallax-element"
		data-parallax-direction="horizontal"
		data-parallax-speed="-0.5"
		>Is Cool</h3
	>
	<div class="box parallax-element" data-parallax-speed="-1.4"></div>
</section>
```

```js
// Parallax
import giftbag from "../src";

const { parallax } = giftbag();

const parallaxElements = document.querySelectorAll(".parallax-element");

parallaxElements.forEach((element) => parallax({ el: element }));
```

## Scroll

Scroll based animations built with the [intersection observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

**Scroll takes in an object of options**
| name        | description                             | default | optional |
| ----------- | --------------------------------------- | ------- | -------- |
| el          | target element for the animation        | none    | required |
| activeClass | class name that will be added to the el | in-view | optional |
| threshold   | when to animate the el (between 0 - 1)  | 0.2     | optional |

**Attributes** <br/>
By default the animation will only run the first time the element is in view, if you want it to run every time the add the `data-reverse` attribute to the element.

```html
<p class="scroll-element" data-reverse>Animate me on scroll</p>
```

**Example**

```html
<section id="scroll">
	<h3 class="scroll-element"
		>All the animations you see on your
		<span class="highlight">favorite sites</span>
	</h3>
	<p class="scroll-element"
		>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis obcaecati
		placeat eaque provident labore excepturi. Officia vel sed cum consequuntur?
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
		blanditiis quidem aliquam dolor, quam neque quibusdam voluptatem voluptate,
		ad aspernatur repellendus pariatur. Sequi deserunt magnam dignissimos quia,
		asperiores architecto?</p
	>
</section>
```

```js
// Scroll
const scrollElements = document.querySelectorAll(".scroll-element");

scrollElements.forEach((el) => {
	scroll({
		el,
	});
});
```

```css
#scroll h3,
#scroll p {
	margin: 0;
	transform: translate3d(0, 100px, 0);
	transition: all 0.5s cubic-bezier(0.55, 0.055, 0.675, 0.19);
	opacity: 0;
}

#scroll h3 {
	text-align: right;
	transform: translate3d(-50px, 0, 0);
	opacity: 0;
	transition: all 0.5s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

#scroll h3.in-view,
#scroll p.in-view {
	transform: translate3d(0, 0, 0);
	opacity: 1;
}
```

## Stagger Children

A quick utility to add staggering effects then animate with css

**Stagger Children takes an object of options**

| name       | description                                       | default | optional |
| ---------- | ------------------------------------------------- | ------- | -------- |
| parent     | the parent that all staggered elements will be in | none    | required |
| transition | adds the stagger to the transition-delay          | true    | optional |
| animation  | adds the stagger to the animation-delay           | false   | optional |
| stagger    | the interval between each staggered element       | 0.1     | optional |

**Example**

```html
<section class="stagger-children">
	<h1>hi</h1>
	<h1>Stagger</h1>
	<h1>Me</h1>
</section>
```

```js
// Stagger Children
const staggerParents = document.querySelectorAll(".stagger-children");

staggerParents.forEach((parent) => {
	staggerChildren({
		parent: parent,
		animation: true,
	});
});
```

```css
.stagger-children h1 {
	opacity: 0;
	transform: translate3d(0, 50px, 0);
	animation: fadeInUp 1s forwards;
}

@keyframes fadeInUp {
	0% {
		opacity: 0;
		transform: translate3d(0, 150px, 0);
	}

	100% {
		opacity: 1;
		transform: translate3d(0, 0px, 0);
	}
}
```

## Chain
Build a timeline that chains multiple animations together

**Config**
To configure the chain you must pass it an array of objects that contain the animatable elements, each object contains the following values

| name     | description                      | default | optional |
| -------- | -------------------------------- | ------- | -------- |
| el       | target element for the animation | none    | required |
| duration | duration of the animation        | 1       | optional |
| delay    | delay of the animation           | 0       | optional |
| anim     | an object of animatable values   | none    | required |
| ease     | animation ease                   | ease    | optional |


  - Key value pairs of the `anim` object follow this pattern:

 	 `
  anim: {
  	animProp: [starting, ending]
  }
  `
<br/>
- All properties within `transform` don't need to be passed within `transform`: 

	`
	anim: {
		scale: [0, 1],
		rotateX: ['40deg', '0deg']
	}
	`

  

```js
import giftbag from 'giftbag';
const { chain } = giftbag();

const config = [
	{
		el: '.el-1',
		duration: 0.3,
		anim: {
			// Using x, y and z reference translate properties
			x: ['20px', '0px']
		}
	},
	{
		el: '.el-2',
		delay: 0.2,
		duration: 0.2,
		anim: {
			y: ['40px', '0px']
		}
	}
]

const elementChain = chain(config);

// Play animation forward
elementChain.play();
// Reverse animation
elementChain.reverse();
// Toggle animation
elementChain.toggle();
```

**Example**
```html
<button class="menu-button">Menu Button</button>
<section>
	<h1>Title</h1>
	<h2>This is the subhead</h2>
</section>
```

```js
import giftbag from 'giftbag';
const { chain } = giftbag();

const config = [
	{
		el: 'menu-button',
		delay: 0.2,
		duration: 0.3,
		anim: {
			opacity: [0, 1],
			x: ['10px', '0px']
		}
	},
	{
		el: 'h1',
		duration: 0.4,
		anim: {
			y: ['20px', '0'],
			opacity: [0, 1]
		}
	},
	{
		el: 'h2',
		duration: 0.3,
		delay: 0.2,
		anim: {
			opacity: [0, 1]
		}
	}
]


const loadingChain = chain(config);

loadingChain.play();
```