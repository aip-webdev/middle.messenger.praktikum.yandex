function cloneDeep<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    const clone = Array.isArray(obj) ? [] as T : {} as T

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            (clone as Indexed)[key] = cloneDeep((obj as Indexed)[key])
        }
    }

    return clone
}

export default cloneDeep
