
const Space = '&emsp;&emsp;';
const Comma = ',&ensp;';
const Br = '<br>';
const EscapedKey = {
    '<': '&lt;'
    , '>': '&gt;'
    , '&': '&amp;'
};

let currentSpace = '';

/**
 * 將json 轉成 html
 * @param {String or Object} str
 * @return {String} html
 */
export function jsonToHtml(data): string {
    if (!data) {
        return data;
    }
    currentSpace = '';
    if (data.constructor === Object) {
        return toHtml(data);
    }
    if (data.constructor === Array) {
        return toHtml(data);
    }
    if (typeof data === 'string') {
        try {
            return toHtml(JSON.parse(data.replace(/\n/g, '\\\\n')));
        } catch (e) {
            return data;
        }
    }
    return data;

}

/**
 * 防止XSS
 * @param {String}
 * @return {String}
 */
function escaped(str: string): string {
    return str.replace(/[<>&]/g, escapMatch);
}

function escapMatch(m) {
    return EscapedKey[m];
}

function toHtml(data): string {
    if (!data) {
        return getValue(data);
    }
    if (data.constructor === Object) {
        return objectToHtml(data);
    } else if (data.constructor === Array) {
        return arrayToHtml(data);
    } else {
        return getValue(data);
    }
}

function objectToHtml(obj): string {
    let html = '{<br>';
    let comma = '';
    let oldSpace = currentSpace;
    currentSpace += Space;
    // tslint:disable-next-line:forin
    for (let i in obj) {
        html += currentSpace + comma + getName(i) + '&ensp;:&ensp;' + toHtml(obj[i]) + Br;
        comma = Comma;
    }
    html += (currentSpace = oldSpace) + '}';
    if (comma) {
        return html;
    } else {
        return '{}';
    }
}

function arrayToHtml(array: any[]): string {
    if (array.length === 0) {
        return '[&ensp;]';
    }
    if (array.length > 5) {
        let oldSpace = currentSpace;
        currentSpace += Space;
        // tslint:disable-next-line:max-line-length
        return '[' + Br + currentSpace + toHtml(array[0]) + getArrayContent(array, Br + currentSpace + Comma) + Br + (currentSpace = oldSpace) + ']';
    } else {
        return '[&ensp;' + toHtml(array[0]) + getArrayContent(array, Comma) + '&ensp;]';
    }
}

function getArrayContent(array: any[], separate) {
    if (array.length < 2) { return ''; }
    let temp = '';
    for (let i = 1; i < array.length; i++) {
        temp += separate + toHtml(array[i]);
    }
    return temp;
}

function getName(text): string {
    return '<span>"' + escaped(text) + '"</span>';
}

function getValue(text): string {
    if (typeof text === 'string') {
        return '<span style="color:#690">"' + escaped(text) + '"</span>';
    } else {
        return '<span style="color:#a11">' + text + '</span>';
    }
}

