import styles from './Titles.module.scss'
import Block from '../../core/Block.ts'

export const H3 = (text: string) =>
    Block('<h3 class={{className}}>{{text}}</h3>', {
        className: styles.title3,
        text: text
    })

export const H4 = (text: string) =>
    Block('<h4 class={{className}}>{{text}}</h4>', {
        className: styles.title4,
        text: text
    })
