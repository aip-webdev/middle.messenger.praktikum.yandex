import styles from './Titles.module.scss'
import Handlebars from "handlebars";
export const H3 = (text) => Handlebars.compile(`<h3 class=${styles.title3}>${text}</h3>`)()
