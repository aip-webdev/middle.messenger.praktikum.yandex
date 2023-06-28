import styles from './ChatMessage.module.scss'
import { template } from './chatMessage.tmpl.ts'
import { IMessage } from '../../pages/ChatPage/types'
import Block from '../../utils/elements/Block.ts'

export const ChatMessage = (message: IMessage) => {
    const { text, time } = message
    return Block(template, {
        messageBlockStyle: styles.chatMessage,
        messageContentStyle: styles.messageContent,
        messageTimeStyle: styles.time,
        content: text,
        time: time
    })
}
