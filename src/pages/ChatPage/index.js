import styles from './ChatPage.module.scss'
import {list} from "../../components/List/index.js";
import {search} from "../../components/Search/index.js";
import {chatItem} from "../../components/ChatItem/index.js";

export const chatPage = (chatContent, mockChats) => {
    let chatItems = mockChats.map((chat) => chatItem(chat.id, chat.name, chat.lastMessage, chat.unreadCount))
    return (`
        <div class=${styles.chat}>
            <nav class=${styles.nav}>
                ${profileNav()}
                ${search()}
                ${list(styles.chatsList, styles.chatItem, chatItems)}
            </nav>
                ${!!chatContent ? chatContent : 
                    `<section class=${styles.chatContentEmpty}>
                        <div>Выберите чат чтобы отправить сообщение</div>
                     </section>`
                }
        </div>
    `)
}

const profileNav = () => `
    <div class=${styles.profileNav}>
        <a href="/profile">Профиль
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9L5 5L1 1" stroke="#999999"/>
            </svg>
        </a>
    </div>
`
