type StringIndexed = Record<string, any>;

function queryStringify(data: StringIndexed): string | never {
    const params: string[] = []

    for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                params.push(`${encodeURIComponent(key)}[${i}]=${encodeURIComponent(value[i])}`)
            }
        } else if (typeof value === 'object' && value !== null) {
            const subParams = Object.keys(value)
            for (const subParam of subParams) {
                const val = queryStringify(value)
                params.push(`${encodeURIComponent(key)}[${subParam}]${val.includes('=') ? val.slice(1) : val}`)
            }
        } else {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        }
    }
    return params.join('&')
}

export default queryStringify

