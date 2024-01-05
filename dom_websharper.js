let accum = []
let indent = 0

const writeElement = (h) => {
    indent = indent + 2
    if (h.tag == 'text') {
        accum.push(`text "${h.data}"\n`)
    } else {
        accum.push(`${h.tag}`)

        let attrs = []
        for (const property in h.attrs) {
            attrs.push(`attr.${property} "${h.attrs[property]}"\n`)
        }

        if (attrs.length > 0) {
            accum.push(`\n`)
            accum.push(' '.repeat(indent))
            accum.push(`[`)
            accum.push(`\n`)
            indent = indent + 2
            accum.push(' '.repeat(indent))
            accum.push(attrs.join(' '.repeat(indent)))
            indent = indent - 2
            accum.push(' '.repeat(indent))
            accum.push(`]\n`)
        } else {
            accum.push(`\n`)
            accum.push(' '.repeat(indent))
            accum.push(`[]\n`)
        }

        if (h.children?.length > 0) {
            h.children?.forEach((e) => {
                accum.push(`\n`)
                accum.push(' '.repeat(indent))
                accum.push(`[`)
                accum.push(`\n`)
                indent = indent + 2
                accum.push(' '.repeat(indent))
                writeElement(e)
                indent = indent - 2
                accum.push(' '.repeat(indent))
                accum.push(`]\n`)
            })
        } else {
            accum.push(`\n`)
            accum.push(' '.repeat(indent))
            accum.push(`[]\n`)
        }
    }
    indent = indent - 2
}

export function to_websharper(h) {
    accum = []
    indent = 0
    h.forEach((e) => writeElement(e))
    return accum.join('')
}
