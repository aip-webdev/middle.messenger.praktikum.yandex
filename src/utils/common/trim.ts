function trim(str: string, chars = ' '): string {
    let start = 0
    let end = str.length - 1

    while (start <= end && chars.includes(str[start])) {
        start++
    }

    while (end >= start && chars.includes(str[end])) {
        end--
    }

    return str.substring(start, end + 1)
}

export default trim
