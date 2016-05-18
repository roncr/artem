import Chart from '../base/chart.js';
import { defaultGetSet } from '../../utils/utils';

class Pie extends Chart {
    constructor() {
        super();
        let opts = {
          width: 500
        };

        let properties = {
            width: defaultGetSet('width', opts)
        };

        this.opts = opts;
        super.bindProperties(properties, opts);
    }

    render() {
        var self = this;

        return function(selection) {
            console.log("rendering pie chart", selection.length, "height", self.width(), self.opts);
        }
    }
}

export default function() {
    var pie = new Pie();
    return pie;
}