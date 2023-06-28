import styles from '../pages/ChatPage/ChatPage.module.scss'
import { ChatPage } from '../pages/ChatPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ChatContent } from '../components/ChatContent'
import { waitElement } from '../utils/elements/waitElement.ts'
import { isEmpty } from '../utils/validation/isEmpty.ts'
import { IChat } from '../pages/ChatPage/types'

interface IChatRouterProps {
  id?: string;
  chatList: IChat[];
}

export const chatRouter = ({
    id,
    chatList
}: IChatRouterProps) => {
    // path=/chats
    if (isEmpty(id)) return ChatPage(chatList)

    const chatInfo = chatList.find((chatObj) => chatObj.id === id)
    // path=/chats/:id
    if (chatInfo) {
        waitElement('main').then((mainEl) => {
            if (isEmpty(mainEl.innerHTML) || !mainEl.innerHTML.toString().includes('chat-content')) {
                mainEl.innerHTML = ''
                mainEl.appendChild(ChatPage(chatList).getContent() as Node)
            }
            waitElement('chat-content')
                .then((el) => {
                    el.innerHTML = ''
                    el.appendChild(ChatContent(chatInfo).getContent() as Node)
                })
                .then(() =>
                    waitElement(`chat-${id}`).then((el) => {
                        !!el.parentElement &&
            (el.parentElement.className = styles.chatItemSelected)
                        chatList
                            .filter((info) => info.id !== id)
                            .forEach((info) => {
                                waitElement(`chat-${info.id}`).then((el) => {
                                    !!el.parentElement &&
                  (el.parentElement.className = styles.chatItem)
                                })
                            })
                    })
                )
        })
        return null
    }
    return NotFoundPage()
}
