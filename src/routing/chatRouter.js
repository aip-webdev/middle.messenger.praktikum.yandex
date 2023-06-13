import styles from "../pages/ChatPage/ChatPage.module.scss";
import {chatPage} from "../pages/ChatPage/index.js";
import {notFoundPage} from "../pages/NotFoundPage/index.js";
import {chatContent} from "../components/ChatContent/index.js";
export const chatRouter = (id, chatList) => {
    if (!id) return chatPage(null, chatList)
    let chatInfo = chatList.find(chatObj => chatObj.id === id)
    if (!!chatInfo) {
        let item = !!id ? document.querySelector(`#chat-${id}`) : null
        if (!!item) {
            item.parentElement.className = styles.chatItemSelected
        }
        return chatPage(chatContent(chatInfo), chatList)
    }
    return notFoundPage()
}
