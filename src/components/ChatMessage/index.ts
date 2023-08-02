import styles from './ChatMessage.module.scss'
import { template } from './chatMessage.tmpl.ts'
import Block from '../../core/Block.ts'
import { getTimeDifference } from '../../utils/strings/getTimeDifference.ts'

export const ChatMessage = (userId: number, message: IMessage | undefined) => {
    const chatMessageStyle = message?.user_id === userId ? styles.chatMessageRight : styles.chatMessageLeft
    return message ? Block(template, {
        messageBlockStyle: chatMessageStyle,
        messageContentStyle: styles.messageContent,
        messageTimeStyle: styles.time,
        content: message.content,
        time: getTimeDifference(message.time)
    }) : ''
}
