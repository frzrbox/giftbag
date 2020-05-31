export default function scroll({ el, activeClass = 'in-view', threshold = 0.2 }) {

    function checkElementVisiblity(entries) {
        const { isIntersecting } = entries[0]
        if (isIntersecting) {
            el.classList.add(activeClass);
        }

        if (el.hasAttribute('data-reverse')) {
            if (!isIntersecting) {
                el.classList.remove(activeClass);
            }
        }

    }

    const observer = new IntersectionObserver(checkElementVisiblity, {
        threshold
    })

    observer.observe(el);
}