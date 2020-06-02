function toKebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Takes shortcut props and converts them to css transforms
function convertToTransform(prop) {
    let newStyles;
    let newAnimValue = [];

    const elementAnimProps = Object.keys(prop);
    const values = ['x', 'y', 'z', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ']
    const animatable = elementAnimProps.filter(animProp => values.includes(animProp));


    // Handles all property edge cases
    if (animatable.includes('x' || 'y' || 'z')) {
        const { x = 0, y = 0, z = 0 } = prop;
        newAnimValue = [...newAnimValue, `translate3d(${x}, ${y}, ${z}) `];
    }

    if (animatable.includes('scale')) {
        const { scale } = prop;
        newAnimValue = [...newAnimValue, `scale(${scale}) `]
    }

    // values.map((value, i) => {
    //     const valid = elementAnimProps.filter(animProp => animProp === value);



    //     // Handles all property edge cases
    //     if (valid[0] === 'x' || 'y' || 'z') {
    //         const { x = 0, y = 0, z = 0 } = prop;
    //         newAnimValue = [...newAnimValue, `translate3d(${x}, ${y}, ${z}) `];
    //     }

    //     if (valid[0] === 'scale') {
    //         const { scale } = prop;
    //         newAnimValue = [...newAnimValue, `scale(${scale}) `]
    //     }


    // });



    newStyles = { ...prop, transform: newAnimValue.join('') };
    return newStyles
}

// Create a new css class for each element with their animations
function createDynamicStyle(el, index, from, to, duration, delay) {
    let elementStyle = document.createElement('style');
    document.head.appendChild(elementStyle);

    let fromStyles = ``;
    let toStyles = ``;

    // Handle edge cases transform properties
    const convertedFrom = convertToTransform(from);
    const convertedTo = convertToTransform(to);

    Object.entries(convertedFrom).map(el => { fromStyles += `${toKebabCase(el[0])}:${el[1]};` });
    Object.entries(convertedTo).map(el => { toStyles += `${toKebabCase(el[0])}:${el[1]};` });

    let keyframe = `@keyframes element${index}Animation{
        from{
            ${fromStyles}
        }
        to{
            ${toStyles}
        }
    }`;

    // Inject new styles into the css 
    elementStyle.sheet.insertRule(keyframe);
    elementStyle.sheet.insertRule(`${el} { ${fromStyles}; animation: element${index}Animation  ${duration}s forwards ${delay} }`);
}

// Main chain function
export default function chain(elementsArr) {
    elementsArr.map((el, i) => {
        const { element, delay = 0, from, to, duration = 1 } = el;

        let elementDelay = `${delay}s`;

        if (i > 0) {
            elementDelay = `${elementsArr[i - 1].duration + delay}s`
        }

        createDynamicStyle(element, i, from, to, duration, elementDelay)
    })
}