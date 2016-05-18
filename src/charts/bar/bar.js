import Chart from '../base/chart';

class Bar extends Chart {
    constructor() {
        super();
        console.log("Initializing a bar chart");
    }
}

export default function() {
    var bar = new Bar();
    return bar;
}