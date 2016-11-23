function getFirstObjectProperty(object) {
    return object[Object.keys(object)[0]];
}

function getFirstObjectPropertyName(object) {
    return Object.keys(object)[0];
}

export {
    getFirstObjectProperty,
    getFirstObjectPropertyName
};

