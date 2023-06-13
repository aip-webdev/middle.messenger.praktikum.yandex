import styles from './ChatItem.module.scss'
import {letterAvatar} from "../LetterAvatar/index.js";
import {stringShorter} from "../../utils/stringShorter.js";

export const chatItem = (id, name, lastMessage, unreadCount ) => `
    <a id="chat-${id}" href=${window.location.origin}/chats/${id} >
        ${letterAvatar(name, styles.avatar)}
        <div class=${styles.info}>
            <span class=${styles.name}>${name}</span>
            <span class=${styles.message}>${stringShorter(lastMessage.text, 28)}</span>
            <span class=${styles.time}>${lastMessage.time}</span>
            ${!!unreadCount && unreadCount > 0 ? `<span class=${styles.unreadCount}>${unreadCount}</span>` : ''}
        </div>
    </a>
`
