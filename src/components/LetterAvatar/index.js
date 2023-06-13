import {stringToColor} from "../../utils/stringToColor.js";

const stringAvatar = (name) => {
    let names = name.split(' ')
        if (names.length >= 2) {
            return `${names[0][0]}${names[1][0]}`
        } else if (names.length === 1) {
            return `${names[0][0]}`
        } else return ''
}

export const letterAvatar = (name, style) => {
    let content = stringAvatar(name)
    return `<div class=${style} style="background-color: ${stringToColor(name)}"><span>${content}</span></div>`

}
