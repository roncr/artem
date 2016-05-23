import d3 from 'd3';

function formatPx(value){
    return `${value}px`;
}

// Inspired by on http://bl.ocks.org/mbostock/1087001
class Tooltip {
    constructor() {
        this._tooltipClass = 'd3-tooltip-box';
        this._transitionSpeed = 200;

        let tooltipEl = d3.select(`.${this._tooltipClass}`);
        if(tooltipEl.empty()) {
            tooltipEl = this._createTooltip();
        }
        console.log(tooltipEl);
        this._tooltipEl = tooltipEl;
    }

    _createTooltip () {
        return d3.select('body').append('div')
            .attr('class', this._tooltipClass)
            .style({
                opacity: 0,
                position: 'absolute'
            });
    }

    show(d) {
        this._tooltipEl
            .transition(this._transitionSpeed)
            .style("opacity", 1);
        this._tooltipEl.html(`<div>${d.value}</div>`);
    }

    move() {
        this._tooltipEl
            .style({
                left: formatPx(d3.event.pageX),
                top: formatPx(d3.event.pageY - 28)
            });
    }

    hide() {
        this._tooltipEl
            .transition(this._transitionSpeed)
            .style('opacity', 0);
    }

}

export default function tooltip() {
    var instance = new Tooltip();
    return instance;
}