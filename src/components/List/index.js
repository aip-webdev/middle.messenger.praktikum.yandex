import {isEmpty} from "../../utils/validation/isEmpty.js";
import Handlebars from "handlebars";

export const List = ({listStyle, itemStyle, items}) => {
    let itemsStr = ''
    !isEmpty(items) && items.forEach(item => itemsStr += `<li class=${itemStyle}>${item}</li>`)
    return Handlebars.compile(`<ul class=${listStyle}>${itemsStr}</ul>`)()
}
