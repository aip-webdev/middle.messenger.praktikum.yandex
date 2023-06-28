import styles from './ErrorContetnt.module.scss'
import { H3 } from '../Titles'
import { template } from './errorContent.tmpl.ts'
import Block from '../../utils/elements/Block.ts'

interface IErrorContentProps {
  code: string;
  message: string;
  linkText: string;
  link?: string;
}

export const ErrorContent = ({
    code,
    message,
    linkText,
    link = '/chats'
}: IErrorContentProps) =>
    Block(template, {
        contentStyle: styles.content,
        codeStyle: styles.code,
        code: code,
        message: H3(message),
        linkStyle: styles.link,
        link: link,
        linkText: linkText
    })
