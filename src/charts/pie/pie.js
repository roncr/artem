import d3 from 'd3';
import Chart from '../base/chart.js';
import PieConstants from './constants';
import d3TooltipBox from 'd3-tooltip-box';
import {
    defaultGetSet, defaultGetter, margin, relativeWidth, relativeHeight,
    initSvg, translate, colorScale, attachStaticProperties, buildTemplate
} from '../../utils/utils';

class Pie extends Chart {
    constructor() {
        super();

        let opts = {
            width: 500,
            height: 500,
            margin: margin(0),
            getValue: d => d.value,
            getKey: d => d.key,
            color: d3.scale.category10(),
            donutRatio: 0,
            showLabels: true,
            labelThreshold: 0.05,
            transformLabel: PieConstants.LABEL_TYPE.KEY,
            tooltipTemplateFn: null
        };

        let properties = {
            width: defaultGetSet('width', opts),
            height: defaultGetSet('height', opts),
            margin: defaultGetSet('margin', opts),
            value: defaultGetSet('getValue', opts),
            key: defaultGetSet('getKey', opts),
            colors: { get: defaultGetter('color', opts), set: (v) => { opts.color = colorScale(v) }},
            donutRatio: defaultGetSet('donutRatio', opts),
            showLabels: defaultGetSet('showLabels', opts),
            labelThreshold: defaultGetSet('labelThreshold', opts),
            label: defaultGetSet('transformLabel', opts),
            tooltip: defaultGetSet('tooltipTemplateFn', opts)
        };

        this.opts = opts;
        super.bindProperties(properties);
    }

    render() {
        let self = this;

        function getArcPercentage(d) {
            return (d.endAngle - d.startAngle) / (2 * Math.PI);
        }

        return function(selection) {
            selection.each(function(data) {
                // Options
                let {
                    width, height, margin, getValue, getKey, color, donutRatio, showLabels,
                    labelThreshold, transformLabel
                } = self.opts;

                // Initialize required components
                var tooltip = d3TooltipBox.tooltip()
                    .template(self.opts.tooltipTemplateFn || function(d){
                        var key = getKey(d.data);

                        var def = {
                            key: key,
                            value: getValue(d.data),
                            color: color(key)
                        };

                        return buildTemplate(def);
                    });

                // Base variables
                let relWidth = relativeWidth(width, margin),
                    relHeight = relativeHeight(height, margin),
                    radius = Math.min(relWidth, relHeight) / 2,
                    innerRadius = donutRatio * radius,
                    svg = initSvg(this);

                // Configure arcs
                let arc = d3.svg.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(innerRadius);

                var labelArc = d3.svg.arc()
                    .outerRadius(radius - 40)
                    .innerRadius(radius - 40);

                // Build pie layout
                let pie = d3.layout.pie()
                    .sort(null)
                    .value(getValue);

                // Create wrapper
                let g = svg.attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", translate(relWidth / 2, relHeight / 2));

                // Create arcs based on pie layout
                let arcG = g.selectAll(".arc")
                    .data(pie(data))
                    .enter().append("g")
                    .attr("class", "arc");

                // Render arcs
                arcG.append("path")
                    .attr("d", arc)
                    .style("fill", function(d, i) { return color(getKey.apply(this, [d.data, i])); })
                    .call(tooltip.bind());

                // Labels
                if(showLabels) {
                    arcG.append('text')
                        .attr("transform", function(d) { return translate(labelArc.centroid(d)); })
                        .attr("dy", ".35em")
                        .text(function(d, i) {
                            var percentage = getArcPercentage(d);

                            if (percentage >= labelThreshold) {
                                switch (transformLabel){
                                    case PieConstants.LABEL_TYPE.KEY:
                                        return getKey.apply(this, [d.data, i]);
                                    case PieConstants.LABEL_TYPE.VALUE:
                                        return d.value;
                                    case PieConstants.LABEL_TYPE.PERCENTAGE:
                                        return d3.format('%')(percentage);
                                }
                            } else {
                                return '';
                            }
                        });
                }
            });
        }
    }
}

function pieBuilder() {
    var pie = new Pie();
    return pie;
}

// Expose constants
attachStaticProperties(pieBuilder, PieConstants);


export default pieBuilder;