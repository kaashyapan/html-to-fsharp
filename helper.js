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
      if (val === 'true' || val === 'false') {
      return val
    } else
        return `"${val}"`
    }  else {
        return val
    }
}
