function toKebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Takes shortcut props and converts them to css transforms
function convertToTransform(prop) {
    let newStyles;
    let newAnimValue = [];


    const elementAnimProps = Object.keys(prop);
    const values = ['x', 'y', 'z', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ'];

    // Handles all property edge cases
    const animatable = elementAnimProps.filter(animProp => values.includes(animProp));
    const { x = 0, y = 0, z = 0 } = prop;

    function handleCustomValues(custom, unit = '') {
        if (animatable.includes(custom)) {
            return newAnimValue = [...newAnimValue, `${custom}(${prop[custom]}${unit})`];
        }
    }

    if (animatable.includes('x') || animatable.includes('y') || animatable.includes('z')) {
        newAnimValue = [...newAnimValue, `translate3d(${x}, ${y}, ${z}) `];
    }

    if (animatable.includes('scale')) {
        const { scale } = prop;
        newAnimValue = [...newAnimValue, `scale(${scale}) `];
    }

    if (animatable.includes('rotate')) {
        const { rotate } = prop;
        newAnimValue = [...newAnimValue, `rotate(${rotate}deg) `];
    }

    handleCustomValues('scaleX');
    handleCustomValues('scaleY');
    handleCustomValues('scaleZ');
    handleCustomValues('rotateX', 'deg');
    handleCustomValues('rotateY', 'deg');
    handleCustomValues('rotateZ', 'deg');

    values.map(val => {
        if (animatable.includes(val)) {
            newStyles = { ...prop, transform: newAnimValue.join('') };
        } else {
            newStyles = prop;
        }
    })

    return newStyles;
}

// Build the keyframe and custom css class for each animation in the chain
function createDynamicStyle({ el, duration = 1, delay = 0, anim }, index, direction, timeline) {
    let elementStyle = document.createElement('style');
    document.head.appendChild(elementStyle);

    // Adds the duration or the previous element to the delay of the next
    if (index > 0) {
        delay = timeline[index - 1].duration + delay;
    }

    let fromStyles = ``;
    let toStyles = ``;

    // TODO - change convertedAnim = convertToTransform(anim)
    const convertedAnim = anim;

    Object.entries(convertedAnim).map(el => fromStyles += `${toKebabCase(el[0])}: ${el[1][0]}; `);
    Object.entries(convertedAnim).map(el => toStyles += `${toKebabCase(el[0])}: ${el[1][1]}; `);

    let keyframe = `@keyframes element${index}Animation{
        from{
            ${fromStyles}
        }
        to{
            ${toStyles}
        }
    }`;


    // Add the custom class & keyframe to the stylesheet
    elementStyle.sheet.insertRule(keyframe);
    elementStyle.sheet.insertRule(`${el} {
         ${fromStyles}
        animation: element${index}Animation ${duration}s forwards ${delay}s;
    }`);

}

export default function chain(timeline, direction = 'normal') {
    timeline.map((event, index) => {
        return createDynamicStyle(event, index, direction, timeline)
    })
}  