import d3 from 'd3';
import Chart from '../base/chart.js';
import { defaultGetSet, defaultGetter, margin, relativeWidth, relativeHeight, initSvg, translate } from '../../utils/utils';

class Pie extends Chart {
    constructor() {
        super();
        let opts = {
            width: 500,
            height: 500,
            margin: margin(0),
            getValue: d => d.value,
            getKey: d => d.key,
            color: d3.scale.category10()
        };

        let properties = {
            width: defaultGetSet('width', opts),
            height: defaultGetSet('height', opts),
            margin: defaultGetSet('margin', opts),
            value: defaultGetSet('getValue', opts),
            key: defaultGetSet('getKey', opts),
            colors: { get: defaultGetter('color'), set: (v) => { opts.color = d3.scale.ordinal().range(v) }}
        };

        this.opts = opts;
        super.bindProperties(properties, opts);
    }

    render() {
        let self = this;

        return function(selection) {
            selection.each(function(data) {
                let { width, height, margin, getValue, getKey, color } = self.opts;

                let relWidth = relativeWidth(width, margin),
                    relHeight = relativeHeight(height, margin),
                    radius = Math.min(relWidth, relHeight) / 2,
                    container = initSvg(this);

                let arc = d3.svg.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(0);

                let pie = d3.layout.pie()
                    .sort(null)
                    .value(getValue);

                let g = container.attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", translate(relWidth / 2, relHeight / 2));

                let arcG = g.selectAll(".arc")
                    .data(pie(data))
                    .enter().append("g")
                    .attr("class", "arc");

                arcG.append("path")
                    .attr("d", arc)
                    .style("fill", function(d) { return color(getKey.apply(this, arguments)); });
            });
        }
    }
}

export default function() {
    var pie = new Pie();
    return pie;
}