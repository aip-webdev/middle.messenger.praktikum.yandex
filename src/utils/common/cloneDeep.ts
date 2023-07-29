function cloneDeep(obj: unknown) {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    const clone = Array.isArray(obj) ? [] : {}

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            (clone as Indexed)[key] = cloneDeep((obj as Indexed)[key])
        }
    }

    return clone
}

export default cloneDeep
