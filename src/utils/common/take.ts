function take<T>(list: T[], num = 1): T[] {
    if (!Array.isArray(list)) {
        throw new Error('bad value')
    }

    if (!Number.isInteger(num) || num < 0) {
        throw new Error('bad value')
    }

    return list.slice(0, num)
}

export default take
