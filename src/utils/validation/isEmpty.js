export const isEmpty = (value) =>{
    switch (typeof value) {
        case "boolean":return true
        case "string":return '' === value
        case "number": return true
        case "undefined": return true
        case "object": {
            if (value === null) return true
            if (value instanceof Map || value instanceof  Set || value instanceof Array) return value.length === 0
            if (value instanceof Object) return Object.entries(value).length === 0
        }
    }
}
