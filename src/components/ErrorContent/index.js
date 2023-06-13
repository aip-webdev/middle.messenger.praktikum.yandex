import styles from './ErrorContetnt.module.scss'
import {titleH3} from "../Titles/index.js";

export const errorContent = (code, message, linkText, link = '/chats') => `
    <div class=${styles.content}>
        <h2 class=${styles.code}>${code}</h2>
        ${titleH3(message)}
        <a href=${link} class=${styles.link}>${linkText}</a>
    </div>
`
