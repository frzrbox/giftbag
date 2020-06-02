export default function chain(elementsArr) {
    elementsArr.map((el, i) => {
        const { element, delay = 0, duration = 0, animation = true, staggerChildren = 0 } = el;
        const animatedElement = document.querySelector(element);

        animatedElement.style.transitionDuration = `${duration}s`;
        animatedElement.style.animationDuration = `${duration}s`

        if (i === 0 && delay) {
            animatedElement.style.transitionDelay = `${delay}s`;

            if (animation) {
                animatedElement.style.animationDelay = `${delay}s`;
            }
        }

        if (i > 0) {
            animatedElement.style.transitionDelay = `${elementsArr[i - 1].duration + delay}s`;

            if (animation) {
                animatedElement.style.animationDelay = `${elementsArr[i - 1].duration + delay}s`;
            }
        }
    })
}