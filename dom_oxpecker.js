let accum = []
let indent = 0

const isNumeric = (value) => {
    return(/^\d+$/.test(value))
}

const isBool = (value) => {
    if (value == "") { return true}
    if (value == "true") { return true}
    if (value == "false") { return false}
    return `"${value}"`
}

const toPascalCase = (string) => {
  return string
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Splits camelCase words into separate words
    .replace(/[-_]+|[^\p{L}\p{N}]/gu, ' ') // Replaces dashes, underscores, and special characters with spaces
    .toLowerCase() // Converts the entire string to lowercase
    .replace(/(?:^|\s)(\p{L})/gu, (_, letter) => letter.toUpperCase()) // Capitalizes the first letter of each word
    .replace(/\s+/g, ''); // Removes all spaces
}

const writeElement = (h) => {
    indent = indent + 2
    if (h.tag == 'text') {
        accum.push(`@"${h.data}"\n`)
    } else {
        let tagname = h.tag
        //webcomponent
        if (tagname.includes("-")) {
            tagname = toPascalCase(tagname)
        } else {
            tagname = tagname.trim().replace(/base$/, `base'`).replace(/object$/, `object'`)
        }
        accum.push(`${tagname}`)

        let attrs = []
        let data_attrs = []
        let other_attrs = []
        let index = 0
        let length = Object.keys(h.attrs).length
        for (let property in h.attrs) {
            index = index +1
            let propVal = isNumeric(h.attrs[property]) ? h.attrs[property] : `"${h.attrs[property]}"`
            propVal = isBool(h.attrs[property])

            if (property.startsWith('data-')) {
                let dataPropName = property.substring(5)
                data_attrs.push(`"${dataPropName}", ${propVal}`)
            } else if (property.includes('-')) {
                other_attrs.push(`"${property}"=${propVal}`)
            } else {
                let p = property
                    .trim()
                    .replace(/class$/, `class'`)
                    .replace(/for$/, `for'`)
                    .replace(/as$/, `as'`)
                    .replace(/type$/, "type'")
                    .replace(/open$/, "open'")
                    .replace(/checked$/, "checked'")

                if (index < length) {
                    attrs.push(`${p}=${propVal},\n`)
                } else {
                    attrs.push(`${p}=${propVal}\n`)
                }
            }
        }

        if (attrs.length > 0) {
            accum.push(`\n`)
            accum.push(' '.repeat(indent))
            accum.push(`(`)
            accum.push(`\n`)
            indent = indent + 2
            accum.push(' '.repeat(indent))
            accum.push(attrs.join(' '.repeat(indent)))
            indent = indent - 2
            accum.push(' '.repeat(indent))
            accum.push(`)\n`)
        } else {
            accum.push(`\n`)
            accum.push(' '.repeat(indent))
            accum.push(`()\n`)
        }

        for (let attr of data_attrs) {
            accum.push(`\n`)
            accum.push(' '.repeat(indent))
            accum.push(`.data(`)
            accum.push(attr)
            accum.push(`)\n`)
        }

        for (let attr of other_attrs) {
            accum.push(`\n`)
            accum.push(' '.repeat(indent))
            accum.push(`.attr(`)
            accum.push(attr)
            accum.push(`)\n`)
        }

        if (h.children?.length > 0) {
            accum.push(`\n`)
            accum.push(' '.repeat(indent))
            accum.push(`{`)
            accum.push(`\n`)
            indent = indent + 2
            h.children?.forEach((e) => {
                accum.push(' '.repeat(indent))
                writeElement(e)
            })
            indent = indent - 2
            accum.push(' '.repeat(indent))
            accum.push(`}\n`)
        } else {
            accum.push(`\n`)
            accum.push(' '.repeat(indent))
            accum.push(`{}\n`)
        }
    }
    indent = indent - 2
}

export function to_oxpecker(h) {
    accum = []
    indent = 0
    h.forEach((e) => writeElement(e))
    return accum.join('')
}
