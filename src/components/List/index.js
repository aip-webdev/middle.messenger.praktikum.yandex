import {isEmpty} from "../../utils/validation/isEmpty.js";

export const list = (listStyle, itemStyle, items) => {
    let itemsStr = ''
    !isEmpty(items) && items.forEach(item => itemsStr += `<li class=${itemStyle}>${item}</li>`)
    return(`
        <ul class=${listStyle}>
            ${itemsStr}
        </ul>
    `)
}
