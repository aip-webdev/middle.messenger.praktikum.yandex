import styles from './ChatPage.module.scss'
import { List } from '../../components/List'
import { Search } from '../../components/Search'
import { ChatItem } from '../../components/ChatItem'
import { template } from './chatPage.tmpl.ts'
import { ProfileLink } from '../../components/ProfileLink'
import { IChat } from './types'
import Block from '../../utils/elements/Block.ts'

export const ChatPage = (mockChats: IChat[]) => {
    const chatItems = mockChats.map((chatInfo) => ChatItem(chatInfo))
    return Block(template, {
        toProfile: ProfileLink(),
        search: Search(),
        chats: List({
            listStyle: styles.chatsList,
            itemStyle: styles.chatItem,
            items: chatItems
        }),
        emptyContentClassName: styles.emptyContent,
        chatContentClassName: styles.chatContent,
        containerClassName: styles.container,
        navClassName: styles.nav
    })
}
