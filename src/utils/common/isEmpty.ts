export const isEmpty = (value: unknown) => {
    switch (typeof value) {
    case 'boolean':
        return true
    case 'string':
        return '' === value.split('').filter(char => char != ' ').join('')
    case 'number':
        return true
    case 'undefined':
        return true
    case 'object': {
        if (value === null) return true
        if (value instanceof Map || value instanceof Set || value instanceof Array) {
            return (value as unknown[] | Set<unknown> | Map<unknown, unknown>).values.length === 0
        }
        return Object.entries(value).length === 0
    }
    }
}
