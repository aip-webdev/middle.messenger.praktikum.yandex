import styles from './Link.module.scss'
import { generateRandomString } from '../../utils/strings/generateRandomString.ts'
import { template } from './link.tmpl.ts'
import Block from '../../core/Block.ts'

interface ILinkProps {
  id?: string;
  children: unknown;
  onClick?: () => void;
  link?: string;
  style?: string;
}

export const Link = ({
    id,
    children,
    onClick,
    link = '',
    style
}: ILinkProps) => {
    const uid = id ? id : onClick ? generateRandomString() : null
    return Block(template, {
        uid: uid,
        style: style || styles.link,
        link: link,
        children: children,
        events: {
            click: onClick
        }
    })
}
