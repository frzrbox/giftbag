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
    let { x = [0, 0], y = [0, 0], z = [0, 0], scale = [0, 0], rotate = [0, 0], scaleX = [0, 0], scaleY = [0, 0], scaleZ = [0, 0], rotateX = [0, 0], rotateY = [0, 0], rotateZ = [0, 0] } = anim;

    // Handle the edge cases for transform values
    function checkAnimatable(value, animValue) {
        if (animatable.includes(value)) {
            newAnimValue[0] += `${value}(${animValue[0]}) `;
            newAnimValue[1] += `${value}(${animValue[1]}) `;
        }
    }

    function checkMultipleAnimatable(value, valueArr, animValueArr) {
        if (animatable.includes(valueArr[0]) || animatable.includes(valueArr[1]) || animatable.includes(valueArr[2])) {
            newAnimValue[0] += `${value}(${animValueArr[0][0]}, ${animValueArr[1][0]}, ${animValueArr[2][0]}) `;
            newAnimValue[1] += `${value}(${animValueArr[0][1]}, ${animValueArr[1][1]}, ${animValueArr[2][1]}) `;
        }
    }

    checkAnimatable('scale', scale);
    checkAnimatable('rotate', rotate);
    checkMultipleAnimatable('translate3d', ['x', 'y', 'z'], [x, y, z]);
    checkMultipleAnimatable('rotate3d', ['rotateX', 'rotateY', 'rotateZ'], [rotateX, rotateY, rotateZ]);
    checkMultipleAnimatable('scale3d', ['scaleX', 'scaleY', 'scaleZ'], [scaleX, scaleY, scaleZ]);

    // Add the transform attribute if it is includes in animatable
    values.map(val => {
        if (animatable.includes(val)) {
            newStyles = { ...anim, transform: newAnimValue };
        }
    })

    return newStyles;
}

// Build the keyframe and custom css class for each animation in the chain
function createDynamicStyle({ el, duration = 1, anim }, index, direction, totalDelay = 0) {
    let elementStyle = document.createElement('style');
    document.head.appendChild(elementStyle);

    //Handle to converting of styles for the stylesheet
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
        animation: element${index}Animation ${duration}s forwards ${direction} ${totalDelay}s;
    }`);
}

export default function chain(timeline, direction = 'normal') {
    let delayArr = [];
    let totalDelay = 0;

    timeline.map(({ delay = 0, duration }, index) => {
        index !== 0 ? delayArr.push(delay + duration) : delayArr.push(delay)
    })
    // Reverse the order of the delays if the want to reverse the chain
    if (direction === 'reverse') delayArr = delayArr.reverse();

    timeline.map((event, index) => {
        // add all the values of the delayArr up to the index + 1 and set it as the totalDelay
        totalDelay = delayArr.slice(0, index + 1).reduce((acc, current) => acc + current);
        return createDynamicStyle(event, index, direction, totalDelay)
    });
}  