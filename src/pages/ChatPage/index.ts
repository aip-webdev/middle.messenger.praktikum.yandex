import styles from './ChatPage.module.scss'
import { List } from '../../components/List'
import { Search } from '../../components/Search'
import { ChatItem } from '../../components/ChatItem'
import { template } from './chatPage.tmpl.ts'
import { NavHeader } from '../../components/ProfileLink'
import Block, { IBlock } from '../../core/Block.ts'
import { waitElement } from '../../utils/elements/waitElement.ts'
import Router from '../../routing/Router.ts'
import { ROUTES } from '../../routing'
import { Button } from '../../components/Button'
import { ModalForm } from '../../components/ModalForm'
import { Input } from '../../components/Input'
import ChatActions from '../../actions/ChatActions.ts'
import Store, { IState } from '../../store'
import { connect } from '../../store/connect.ts'
import { STORE_EVENTS } from '../../store/storeEvents.ts'

interface IChatPageProps {
  content: IBlock;
}

export const ChatPage = ({ content }: IChatPageProps) => {
    const mapStateToProps = (state: IState) => {
        return {
            listStyle: styles.chatsList,
            itemStyle: styles.chatItem,
            items: state.chats.list.map((chatInfo) => ChatItem({
                chatId: chatInfo.id, onClick: () => Router.go(ROUTES.CHAT(chatInfo.id))
            }))
        }
    }
    return Block(template, {
        toProfile: NavHeader(),
        search: Search(),
        addChatBtn: Button({
            children: 'Добавить чат',
            style: styles.addChatBtn,
            onClick: () => {
                waitElement('modal').then(element => element.appendChild(
          ModalForm({
              title: 'Добавьте чат',
              btnText: 'Добавить',
              children: Input({
                  name: 'title',
                  style: styles.inputField,
                  attr: 'data-chat-name'
              }),
              onSubmitForm: (e: Event) => {
                  e.preventDefault()
                  e.stopPropagation()
                  ChatActions.createChat()
                  Store.subscribe(() => {
                      element.innerHTML = ''
                  }, STORE_EVENTS.CREATE_CHAT_SUCCESS)
              }
          }).getContent() as Node
                ))
            }
        }),
        chats: connect(
            List(mapStateToProps(Store.getState())),
            mapStateToProps,
            STORE_EVENTS.GET_CHATS_SUCCESS
        ),
        content: content,
        chatContentClassName: styles.chatContent,
        containerClassName: styles.container,
        navClassName: styles.nav
    })
}
