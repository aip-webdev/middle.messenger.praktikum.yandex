import styles from './ChatMessage.module.scss'

export const chatMessage = (message) => {
    const {text, time} = message
    return (`
        <div class=${styles.chatMessage}>
            <p class=${styles.messageContent}>${text}</p>
            <span class=${styles.time}>${time}</span>
        </div>
    `)
}