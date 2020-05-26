# ⚠️⚠️ Refactored version of original giftbag js don't use yet ⚠️⚠️

# Giftbag

A lighweight library for quickly building animations

## Dark Mode

The purpose of dark mode is to act as a toggle only between two themes, if you want to build mulitple different themes you can use the [Theme Builder](#theme-builder) api

**Dark Mode takes in an object of options to setup and initialize**
| Name | Description | Default | Optional |
|-------------|-----------------------------------------------------------------|--------------|----------|
| wrapper | The container the dark mode animation | none | required |
| activeClass | The class that will be applied to all children of the wrapper | in-dark-mode | optional |
| active | The initial state of dark mode | false | optional |
| trigger | The element that will be used to toggle the dark mode animation | none | required |

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
