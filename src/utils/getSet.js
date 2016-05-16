export function defaultGetter (key, options) {
    return function() {
        return options[key];
    };
}

export function defaultSetter (key, options) {
    return function(v) {
        options[key] = v;
    };
}

export function defaultGetSet(key, options) {
    return  {
        get: defaultGetter(key, options),
        set: defaultSetter(key, options)
    };
}