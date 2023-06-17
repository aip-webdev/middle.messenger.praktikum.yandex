import styles from './ChatItem.module.scss'
import {LetterAvatar} from "../LetterAvatar/index.js";
import {stringShorter} from "../../utils/stringShorter.js";
import {Link} from "../Link/index.js";
import Handlebars from "handlebars";
import {pushHistory} from "../../routing/index.js";

export const ChatItem = ({id, name, lastMessage, unreadCount} ) => {
    const handleClick = () => {
        if(window.location.pathname.includes('chats')) {
            pushHistory(`/chats/${id}`)
        } else {
            pushHistory('/chats')
            pushHistory(`/chats/${id}`)
        }

    }
    return Handlebars.compile(Link({
        id: `chat-${id}`,
        onClick: handleClick,
        children: `
        ${LetterAvatar(name, styles.avatar)}
        <div class=${styles.infoLeft}>
            <span class=${styles.name}>${name}</span>
            <span class=${styles.message}>${stringShorter(lastMessage.text, 28)}</span>
        </div>
        <div class=${styles.infoRight}>
            <span class=${styles.time}>${lastMessage.time}</span>
            ${!!unreadCount && unreadCount > 0 ? `<span class=${styles.unreadCount}>${unreadCount}</span>` : ''}
        </div>
    `
    }))()
}
