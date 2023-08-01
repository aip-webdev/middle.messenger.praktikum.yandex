import { Indexed } from '../../types'

function classNames(...args: unknown[]): string {
    const classes: string[] = []

    args.forEach((arg) => {
        if (typeof arg === 'string') {
            classes.push(arg)
        } else if (typeof arg === 'object' && !Array.isArray(arg) && arg !== null) {
            for (const key in arg) {
                if ((arg as Indexed)[key]) {
                    classes.push(key)
                }
            }
        } else if (typeof arg === 'number' && arg !== 0) {
            classes.push(arg.toString())
        } else if (Array.isArray(arg) && arg !== null) {
            arg.forEach((item) => {
                classes.push(classNames(item))
            })
        }
    })

    return classes.filter(string => string !== '').join(' ')
}

export default classNames
