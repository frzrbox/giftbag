function toKebabCase(str) { return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(); }

// Takes shortcut props and converts them to css transforms
function convertToTransform(anim) {
    let newStyles = anim;
    let newAnimValue = ['', ''];

    // Handles all property edge cases
    const elementAnimProps = Object.keys(anim);
    const values = ['x', 'y', 'z', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ'];
    const animatable = elementAnimProps.filter(animProp => values.includes(animProp));

    // Set default for transformable values not included to [0,0] 
    let {
        x = [0, 0],
        y = [0, 0],
        z = [0, 0],
        scale = [0, 0],
        rotate = [0, 0],
        scaleX = [0, 0],
        scaleY = [0, 0],
        scaleZ = [0, 0],
        rotateX = [0, 0],
        rotateY = [0, 0],
        rotateZ = [0, 0] } = anim;

    // TODO refactor this into a helper function later
    if (animatable.includes('x') || animatable.includes('y') || animatable.includes('z')) {
        newAnimValue[0] += `translate3d(${x[0]}, ${y[0]}, ${z[0]}) `;
        newAnimValue[1] += `translate3d(${x[1]}, ${y[1]}, ${z[1]}) `;
    }

    if (animatable.includes('rotateX') || animatable.includes('rotateY') || animatable.includes('rotateZ')) {
        newAnimValue[0] += `rotate3d(${rotateX[0]}, ${rotateY[0]}, ${rotateZ[0]}) `;
        newAnimValue[1] += `rotate3d(${rotateX[1]}, ${rotateY[1]}, ${rotateZ[1]}) `;
    }

    if (animatable.includes('scaleX') || animatable.includes('scaleY') || animatable.includes('scaleZ')) {
        newAnimValue[0] += `scale3d(${scaleX[0]}, ${scaleY[0]}, ${scaleZ[0]}) `;
        newAnimValue[1] += `scale3d(${scaleX[1]}, ${scaleY[1]}, ${scaleZ[1]}) `;
    }

    if (animatable.includes('scale')) {
        newAnimValue[0] += `scale(${scale[0]}) `;
        newAnimValue[1] += `scale(${scale[1]}) `;
    }

    if (animatable.includes('rotate')) {
        newAnimValue[0] += `rotate(${rotate[0]}) `;
        newAnimValue[1] += `rotate(${rotate[1]}) `;
    }

    // Add the transform attribute if it is includes in animatable
    values.map(val => {
        if (animatable.includes(val)) {
            newStyles = { ...anim, transform: newAnimValue };
        }
    })

    return newStyles;
}

// Build the keyframe and custom css class for each animation in the chain
function createDynamicStyle({ el, duration = 1, delay = 0, anim }, index, direction, timeline) {
    let elementStyle = document.createElement('style');
    document.head.appendChild(elementStyle);

    //TODO: Make a reduce function - Adds the duration and delay of all previous element to the delay of the next
    let totalPreviousElementTime;

    // Only working for the previous element instead of adding all previous elements
    if (index > 0) {
        if (timeline[index - 1].delay) {
            totalPreviousElementTime = timeline[index - 1].duration + timeline[index - 1].delay
        } else {
            totalPreviousElementTime = timeline[index - 1].duration
        }

        delay = totalPreviousElementTime + delay;
    }

    // Handle to converting of styles for the stylesheet
    let fromStyles = ``;
    let toStyles = ``;

    const convertedAnim = convertToTransform(anim)

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