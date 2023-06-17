import styles from './ChatMessage.module.scss'
import Handlebars from "handlebars";

export const ChatMessage = (message) => {
    const {text, time} = message
    return Handlebars.compile(`
        <div class=${styles.chatMessage}>
            <p class=${styles.messageContent}>${text}</p>
            <span class=${styles.time}>${time}</span>
        </div>
    `)()
}
