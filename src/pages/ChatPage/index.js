import styles from './ChatPage.module.scss'
import {List} from "../../components/List/index.js";
import {Search} from "../../components/Search/index.js";
import {ChatItem} from "../../components/ChatItem/index.js";
import {Link} from "../../components/Link/index.js";
import Handlebars from "handlebars";
import {pushHistory} from "../../routing/index.js";

export const ChatPage = (mockChats) => {
    let chatItems = mockChats.map((chatInfo) => ChatItem(chatInfo))
    return Handlebars.compile(`
        <div class=${styles.chat}>
            <nav class=${styles.nav}>
                ${ProfileNav()}
                ${Search()}
                ${List({
                    listStyle: styles.chatsList,
                    itemStyle: styles.chatItem,
                    items: chatItems
                })}
            </nav>
            <section id='chat-content' class=${styles.chatContent}>
                <div class=${styles.emptyContent}>
                        <div>Выберите чат чтобы отправить сообщение</div>
                </div>            
            </section>
        </div>
    `)()
}

const ProfileNav = () => Handlebars.compile(`
    <div class=${styles.profileNav}> 
        ${Link({
            children: 'Профиль', 
            onClick: () => pushHistory('/profile'), 
            style: styles.profileLink
        })}
    </div>
`)()
