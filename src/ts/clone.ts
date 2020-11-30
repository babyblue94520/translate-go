export function clone(...args) {
    return doClone(args);
}

export function deepClone(...args) {
    return doClone(args, []);
}

function doClone(args, logs?) {
    // tslint:disable-next-line:variable-name
    let source;
    // tslint:disable-next-line:variable-name
    let dest;

    if (args.length === 1) {
        source = args[0];
    } else if (args.length === 2) {
        dest = args[0];
        source = args[1];
    } else {
        return;
    }
    if (Array.isArray(source)) {
        dest = Array.isArray(dest) ? dest : [];
    } else if (isObject(source)) {
        dest = isObject(dest) ? dest : {};
    } else {
        // tslint:disable-next-line:triple-equals
        return source == undefined ? dest : source;
    }
    if (logs === undefined) {
        return copy(dest, source);
    } else {
        return deepCopy(logs, dest, source);
    }
}

/**
 * 複製
 */
function copy(dest, source) {
    // tslint:disable-next-line:forin
    for (let i in source) {
        dest[i] = source[i];
    }
    return dest;
}

/**
 * 複製
 */
function deepCopy(logs, dest, source) {
    if (logs.indexOf(source) !== -1) {
        return source;
    }
    logs.push(source);
    // tslint:disable-next-line:forin
    for (let i in source) {
        dest[i] = getValue(logs, dest[i], source[i]);
    }
    return dest;
}

function getValue(logs, dest, source) {
    if (Array.isArray(source)) {
        return deepCopy(logs, dest || [], source);
    } else if (isObject(source)) {
        return deepCopy(logs, dest || {}, source);
    } else {
        return source;
    }
}

function isObject(value): boolean {
    if (value === null || value === undefined) {
        return false;
    }
    return (value.constructor === Object);
}
