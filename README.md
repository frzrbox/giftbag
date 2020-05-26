# Giftbag

A lighweight library for quickly building animations

## Dark Mode

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
