export function getRidofEmptyLines(str) {
    return str
        .split('\n')
        .filter((line) => line.trim() !== '')
        .join('\n')
}

export function attrStringify(str) {
    let val = str.trim()
    let pattern = /[^0123456789.]/
    if (val.match(pattern)) {
        return `"${val}"`
    } else if (val === 'true') {
        return `true`
    } else if (val === 'false') {
        return `false`
    } else {
        return val
    }
}
