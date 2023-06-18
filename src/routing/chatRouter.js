import styles from "../pages/ChatPage/ChatPage.module.scss";
import {ChatPage} from "../pages/ChatPage/index.js";
import {NotFoundPage} from "../pages/NotFoundPage/index.js";
import {ChatContent} from "../components/ChatContent/index.js";
import {waitElement} from "../utils/waitElement.js";
import {isEmpty} from "../utils/validation/isEmpty.js";

export const chatRouter = (id, chatList) => {
    // path=/chats
    if (!id) return waitElement('main').then((mainEl) => { mainEl.innerHTML = ChatPage(chatList)})
    let chatInfo = chatList.find(chatObj => chatObj.id === id)
    // path=/chats/:id
    if (!!chatInfo) {
        waitElement('main').then((mainEl) => {
            if (isEmpty(mainEl.innerHTML) || !mainEl.innerHTML.toString().includes('chat-content')) {
                mainEl.innerHTML = ChatPage(chatList)
            }
            waitElement('chat-content').then((el) => {
                el.innerHTML = ChatContent(chatInfo)
            }).then(() => waitElement(`chat-${id}`).then((el) => {
                el.parentElement.className = styles.chatItemSelected
                chatList.filter((info) => info.id !== id)
                    .forEach((info) => {
                        waitElement(`chat-${info.id}`).then((el) => {
                            el.parentElement.className = styles.chatItem
                        })
                })
            }))
        })
        return null
    }
    return NotFoundPage()
}
