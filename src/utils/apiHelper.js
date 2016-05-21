export function attachStaticProperties (obj, properties) {
    for(let prop in properties) {
        obj[prop] = properties[prop];
    }
}