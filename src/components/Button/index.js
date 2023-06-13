import styles from './Button.module.scss'
import {isEmpty} from "../../utils/validation/isEmpty.js";

export const button = (children, style, type = 'button', link = '', label) =>
    `<button 
        ${!isEmpty(style) ? `class=${style}` : ''}
        type=${type} 
        ${!isEmpty(label) ? `aria-label=${label}` : ''}
    >
        ${!isEmpty(link) ?
        `<a class=${styles.link} href=${link}>${children}</a>` : children
    }
    </button> `
