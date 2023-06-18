import styles from './Link.module.scss'
import Handlebars from "handlebars";
import {generateRandomString} from "../../utils/strings/generateRandomString.js";
import {clickEvent} from "../../utils/events/clickEvent.js";
import {isEmpty} from "../../utils/validation/isEmpty.js";

export const Link = ({id, children, onClick, link = '', style}) => {
    let uid = !!id ? id : !!onClick ? generateRandomString() : null
    !!onClick ? clickEvent(uid, onClick) : null
    return Handlebars.compile(`
        <a 
            ${!isEmpty(uid) ? `id=${uid}`: ''} 
            class=${style || styles.link} 
            ${!isEmpty(link) ? `href=${link}` : ''}
        >
            ${children}
        </a>
    `)()
}
