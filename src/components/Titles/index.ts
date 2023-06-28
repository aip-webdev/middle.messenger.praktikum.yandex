import styles from './Titles.module.scss'
import Block from '../../utils/elements/Block.ts'

export const H3 = (text: string) =>
    Block('<h3 class={{className}}>{{text}}</h3>', {
        className: styles.title3,
        text: text
    })
