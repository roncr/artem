function propertyBuilder (propertyDef, component) {
    return function(v) {
        if (!arguments.length) {
            return propertyDef.get();
        }

        propertyDef.set(v);

        return component;
    }
}

class Chart {
    constructor() {
    }
    
    bindProperties (properties) {
        for(let prop in properties) {
            this[prop] = propertyBuilder(properties[prop], this);
        }
    }
}

export default Chart;