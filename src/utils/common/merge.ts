function merge(obj1: Indexed, obj2: Indexed): Indexed {
    const merged: Indexed = {}

    for (const key in obj1) {
        if (Object.prototype.hasOwnProperty.call(obj1, key)) {
            merged[key] = obj1[key]
        }
    }

    for (const key in obj2) {
        if (Object.prototype.hasOwnProperty.call(obj2, key)) {
            if (typeof obj2[key] === 'object' && typeof merged[key] === 'object') {
                merged[key] = merge((merged)[key] as Indexed, obj2[key] as Indexed)
            } else {
                merged[key] = obj2[key]
            }
        }
    }

    for (const key in merged) {
        obj1[key] = merged[key]
    }
    return obj1
}

export default merge
