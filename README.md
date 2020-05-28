# ⚠️⚠️ Refactored version of original giftbag js don't use yet ⚠️⚠️

# Giftbag

A lightweight library for quickly building animations

**Content**
[Dark Mode](#dark-mode)
[Theme Builder](#theme-builder)
[Parallax](#parallax)

## Dark Mode

The purpose of dark mode is to act as a toggle only between two themes, if you want to build mulitple different themes you can use the [Theme Builder](#theme-builder) api

**Dark Mode takes in an object of options to setup and initialize**
| Name | Description | Default | Optional |
|-------------|-----------------------------------------------------------------|--------------|----------|
| wrapper | The container of the dark mode animation | none | required |
| activeClass | The class that will be applied to all children of the wrapper | in-dark-mode | optional |
| active | The initial state of dark mode | false | optional |
| trigger | The element that will be used to toggle the dark mode animation | none | required |

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
| Name | Description | Default | Optional |
|----------|-----------------------------------|---------|----------|
| provider | The container of the theme animation | body | optional |
| initial | Set the default theme to start in | none | optional |

**Methods**
| name | description |
|-------------------|-------------------------------------------------------|
| setTheme() | Allows you to change the theme throughout the website |
| getCurrentTheme() | Returns the current theme |

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
| name | description | optional |
|------|---------------------------|----------|
| el | target parallax element | required |
| ease | Returns the current theme | optional |

**Element attributes**
| name | description | default |
|-------------------------|---------------------------------------|----------|
| data-parallax-speed | speed and direction of the parallax | 0 |
| data-parallax-direction | orientation the parallax will animate | vertical |

- `data-parallax-speed` - positive values animate from left / right or top / bottom, while negative values will do the opposite. The higher the value the faster the speed.
- `data-parallax-direction` - either `horizontal` or `vertical`

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
