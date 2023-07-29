function omit(keys: string[], obj: Indexed) {
    if (!keys.length) return obj
    const { [keys.pop() as string]: omitted, ...rest } = obj
    return omit(keys, rest)
}

export default omit
