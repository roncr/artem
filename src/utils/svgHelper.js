import d3 from 'd3';

export function margin(...params) {
    if(params) {
        switch(params.length){
            case 1:
                let value = params[0];
                return margin(value, value, value, value);
            case 2:
                let [verticalVal, horizontalVal] = params;
                return margin(verticalVal, horizontalVal, verticalVal, horizontalVal);
            case 4:
                let [top, right, bottom, left] = params;
                return {top: top, right: right, bottom: bottom, left: left};
            default:
                throw "ERROR: Invalid parameters for margin function";
        }
    } else {
        throw "ERROR: At least one numeric value is required for the margin";
    }
}

export function relativeWidth(width, margin) {
    return width - margin.left - margin.right;
}

export function relativeHeight(height, margin) {
    return height - margin.top - margin.bottom;
}

export function initSvg(container) {
    var svg = d3.select(container);
    // TODO: check if the container is indeed an svg, otherwise create a new svg element and inject into the container
    svg.classed({'artem-svg':true});
    return svg;
}

export function translate(x, y) {
    if(x & y){
        return `translate(${x}, ${y})`;
    } else {
        return `translate(${x})`;
    }
}