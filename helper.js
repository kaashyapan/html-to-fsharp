export function getRidofEmptyLines(str) {
    return str
        .split('\n')
        .filter((line) => line.trim() !== '')
        .join('\n')
}
