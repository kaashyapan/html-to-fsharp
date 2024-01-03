import parse from 'html-dom-parser'

const nonWhiteLength = (att) => {
    return att.trim().length
}

const isObjectEmpty = (objectName) => {
    return (
        objectName &&
        Object.keys(objectName).length === 0 &&
        objectName.constructor === Object
    )
}

const parseElement = (e) => {
    let attrs = {}
    let children = []
    if (e.type == 'tag') {
        children = (e?.children ?? Array())?.map((e) => parseElement(e))
        attrs = e?.attribs ?? {}
        return {
            tag: e.name,
            children: children.filter((i) => !isObjectEmpty(i)),
            attrs: attrs,
            data: e?.data,
        }
    } else {
        if (e.type == 'directive') {
            return {}
        } else {
            if (e.type == 'text') {
                let str = e?.data ?? ''
                if (nonWhiteLength(str) > 0) {
                    return {
                        tag: 'text',
                        children: children,
                        attrs: attrs,
                        data: str.trim(),
                    }
                } else return {}
            } else {
                return {}
            }
        }
    }
}

export function parse_html(html_str) {
    let elements = parse(html_str.trim())
    let _es = elements
        .map((e) => parseElement(e))
        .filter((i) => !isObjectEmpty(i))
    return _es
}
