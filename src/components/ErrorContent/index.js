import styles from './ErrorContetnt.module.scss'
import Handlebars from "handlebars";
import {H3} from "../Titles/index.js";

export const errorContent = (code, message, linkText, link = '/chats') => Handlebars.compile(`
    <div class=${styles.content}>
        <h2 class=${styles.code}>${code}</h2>
        ${H3(message)}
        <a href=${link} class=${styles.link}>${linkText}</a>
    </div>
`)()
