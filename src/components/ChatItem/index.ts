import styles from './ChatItem.module.scss'
import { LetterAvatar } from '../LetterAvatar'
import { stringShorter } from '../../utils/strings/stringShorter.ts'
import { Link } from '../Link'
import { pushHistory } from '../../routing'
import { IChat } from '../../pages/ChatPage/types'
import Block from '../../utils/elements/Block.ts'

export const ChatItem = ({ id, name, lastMessage, unreadCount }: IChat) => {
    const handleClick = () => {
        if (window.location.pathname.includes('chats')) {
            pushHistory(`/chats/${id}`)
        } else {
            pushHistory('/chats')
            pushHistory(`/chats/${id}`)
        }
    }
    return Block('{{{link}}}',
        {
            link: Link({
                id: `chat-${id}`,
                onClick: handleClick,
                children: Block(`
        {{{avatar}}}
        <div class="${styles.infoLeft}">
            <span class="${styles.name}">${name}</span>
            <span class="${styles.message}">${stringShorter(lastMessage.text, 28)}</span>
        </div>
        <div class="${styles.infoRight}">
            <span class="${styles.time}">${lastMessage.time}</span>
            ${!!unreadCount && unreadCount > 0
        ? `<span class="${styles.unreadCount}">${unreadCount}</span>`
        : ''}
        </div>
    `, {
                    avatar: LetterAvatar(name, styles.avatar)
                })
            })
        }
    )
}
