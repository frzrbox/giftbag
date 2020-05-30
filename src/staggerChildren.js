export default function staggerChildren({ parent, transition = true, animation = false, stagger = 0.1 }) {
    const children = parent.querySelectorAll('*');

    children.forEach((child, i) => {
        if (transition) {
            child.style.transitionDelay = `${i * stagger}s`;
        }
        if (animation) {
            child.style.animationDelay = `${i * stagger}s`;
        }
    })
}