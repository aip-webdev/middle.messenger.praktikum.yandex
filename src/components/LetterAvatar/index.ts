import { stringToColor } from '../../utils/strings/stringToColor.ts'
import { template } from './letterAvatar.tmpl.ts'
import Block from '../../utils/elements/Block.ts'

const stringAvatar = (name: string) => {
    const names = name.split(' ')
    if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`
    } else if (names.length === 1) {
        return `${names[0][0]}`
    } else return ''
}

export const LetterAvatar = (name: string, style: string) => {
    const content = stringAvatar(name)
    return Block(template, {
        className: style,
        color: stringToColor(name),
        content: content
    })
}
