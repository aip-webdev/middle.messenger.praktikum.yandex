function omit<T extends object>(keys: (keyof T)[], obj: T) {
    const result: Partial<T> = {}
    for (const key in obj) {
        if (!keys.includes(key)) {
            result[key] = obj[key]
        }
    }
    return result

}

export default omit
