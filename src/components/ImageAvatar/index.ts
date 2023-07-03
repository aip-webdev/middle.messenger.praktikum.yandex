import styles from './ImageAvatar.module.scss'
import { template } from './imageAvatar.tmpl.ts'
import Block from '../../utils/elements/Block.ts'

export const ImageAvatar = (link?: string) =>
    Block(template, {
        style: styles.avatarBlock,
        imageStyle: styles.image,
        link: link
    })
