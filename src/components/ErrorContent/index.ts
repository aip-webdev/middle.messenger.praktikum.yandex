import styles from './ErrorContetnt.module.scss'
import { H3 } from '../Titles'
import { template } from './errorContent.tmpl.ts'
import Block from '../../core/Block.ts'
import { ROUTES } from '../../routing'

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
    link = ROUTES.MESSENGER
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
