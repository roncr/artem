/**
 * Creates a default getter for a chart property
 * @param property the property name of the getter
 * @param options the options supported by the chart
 * @returns {Function} the getter function
 */
export function defaultGetter (property, options) {
    return function() {
        return options[property];
    };
}

/**
 * Creates a default setter for a chart property
 * @param property the property name of the setter
 * @param options the options supported by the chart
 * @returns {Function} the setter function
 */
export function defaultSetter (property, options) {
    return function(v) {
        options[property] = v;
    };
}

/**
 * Creates the default getter & setter of a property
 * @param property the property name
 * @param options the properties supported by the chart
 * @returns {{get: Function, set: Function}} an object
 * containing the getter and setter functions
 */
export function defaultGetSet(key, options) {
    return  {
        get: defaultGetter(key, options),
        set: defaultSetter(key, options)
    };
}