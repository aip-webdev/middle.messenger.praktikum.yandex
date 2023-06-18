import Handlebars from "handlebars";
import {generateRandomString} from "../../utils/strings/generateRandomString.js";
import {clickEvent} from "../../utils/events/clickEvent.js";

export const Button = ({children = '', onClick = () => {}, style}) => {
    let id = generateRandomString()
    clickEvent(id, onClick).then()
    return Handlebars.compile(`<button id=${id} type='button' class=${style} onload="">${children}</button>`)()
}
