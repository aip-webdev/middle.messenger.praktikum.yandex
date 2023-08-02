function set(obj: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof path !== 'string') throw new Error('path must be string')
    if (typeof obj !== 'object' || obj === null) return obj
    const keys = path.split('.')
    let currentObj = obj as Indexed

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        if (!(key in currentObj)) currentObj[key] = {}
        currentObj = currentObj[key] as Indexed
    }
    currentObj[keys[keys.length - 1]] = value
    return currentObj
}

export default set
