import styles from './ChatItem.module.scss'
import { LetterAvatar } from '../LetterAvatar'
import { stringShorter } from '../../utils/strings/stringShorter.ts'
import { Link } from '../Link'
import Block from '../../core/Block.ts'
import { getTimeDifference } from '../../utils/strings/getTimeDifference.ts'
import Store, { IState } from '../../store'
import { connect } from '../../store/connect.ts'
import { STORE_EVENTS } from '../../store/storeEvents.ts'
import { IChat } from '../../types'

interface IChatItemProps {
  chatId: number;
  onClick: () => void;
}

export const ChatItem = ({ chatId, onClick }: IChatItemProps) => {
    const mapStateToProps = (store: IState) => {
        const chatInfo = store.chats.list.find(chat => chat.id === chatId) as IChat
        const { id, title, last_message: lastMessage, unread_count: unreadCount } = chatInfo

        return {
            link: Link({
                id: `chat-${id}`,
                onClick: onClick,
                children: Block(`
        {{{avatar}}}
        <div class="${styles.infoLeft}">
            <span class="${styles.name}">${title}</span>
            <span class="${styles.message}">${lastMessage ? stringShorter(lastMessage.content, 28) : ''}</span>
        </div>
        <div class="${styles.infoRight}">
            <span class="${styles.time}">${lastMessage ? getTimeDifference(lastMessage.time) : ''}</span>
            ${!!unreadCount && unreadCount > 0
        ? `<span class="${styles.unreadCount}">${unreadCount}</span>`
        : ''}
        </div>
    `, {
                    avatar: LetterAvatar(title, styles.avatar)
                })
            })
        }
    }
    return connect(
        Block('{{{link}}}',
            mapStateToProps(Store.getState())
        ),
        mapStateToProps,
        STORE_EVENTS.CHAT_UPDATED_SUCCESS
    )
}
