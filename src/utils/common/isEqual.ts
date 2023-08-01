import { Indexed } from '../../types'

function isEqual(value1: unknown, value2: unknown): boolean {
    if (typeof value1 !== typeof value2) {
        return false
    }

    if (typeof value1 === 'object' && value1 !== null && value2 !== null) {
        const keys1 = Object.keys(value1 as Indexed)
        const keys2 = Object.keys(value2 as Indexed)

        if (keys1.length !== keys2.length) {
            return false
        }

        for (let i = 0; i < keys1.length; i++) {
            const key = keys1[i]
            const nestedValue1 = (value1 as Indexed)[key]
            const nestedValue2 = (value2 as Indexed)[key]

            if (!isEqual(nestedValue1, nestedValue2)) {
                return false
            }
        }

        return true
    }

    return value1 === value2
}

export default isEqual
