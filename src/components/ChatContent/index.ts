import styles from './ChatContent.module.scss'
import { LetterAvatar } from '../LetterAvatar'
import { ChatMessage } from '../ChatMessage'
import { Form } from '../Form'
import { Input } from '../Input'
import { Button } from '../Button'
import { template } from './chatContent.tmpl.ts'
import Block from '../../core/Block.ts'
import { validateFields, VALIDATION_TYPE } from '../../utils/validation/validateFields.ts'
import { List } from '../List'
import { waitElement } from '../../utils/elements/waitElement.ts'
import { ModalForm } from '../ModalForm'
import ChatActions from '../../actions/ChatActions.ts'
import Store, { IState } from '../../store'
import { connect } from '../../store/connect.ts'
import { STORE_EVENTS } from '../../store/storeEvents.ts'
import WSClient from '../../core/WSClient.ts'
import { getFormData } from '../../utils/validation/getFormData.ts'

const validationProps = {
    validation: VALIDATION_TYPE.MESSAGE,
    style: styles.message,
    errorStyle: styles.messageError,
    textErrorStyle: styles.textError
}
export const ChatContent = ({ id, title }: IChat) => {
    const settingsVisibleHandler = () => {
        const el = settings.getContent()
        if (el) {
            el.className.includes('hidden') ?
                el.className = styles.chatSettingsList :
                el.className = styles.chatSettingsList_hidden
        }
    }
    const settings = List({
        itemStyle: styles.chatSettingsItem,
        items: [
            Button({
                children: 'Добавить пользователя',
                onClick: () => {
                    settingsVisibleHandler()
                    waitElement('modal').then(element => element.appendChild(
            ModalForm({
                title: 'Добавить пользователя',
                btnText: 'Добавить',
                children: Input({
                    name: 'login',
                    style: styles.inputField
                }),
                onSubmitForm: (e: Event) => {
                    e.preventDefault()
                    e.stopPropagation()
                    ChatActions.addUserToChat().then(() => element.innerHTML = '')
                }
            }).getContent() as Node
                    ))
                }
            }),
            Button({
                children: 'Удалить пользователя',
                onClick: () => {
                    settingsVisibleHandler()
                    waitElement('modal').then(element => element.appendChild(
            ModalForm({
                title: 'Удалить пользователя',
                btnText: 'Удалить',
                children: Input({
                    name: 'login',
                    style: styles.inputField
                }),
                onSubmitForm: (e: Event) => {
                    e.preventDefault()
                    e.stopPropagation()
                    ChatActions.deleteUserFromChat().then(() => element.innerHTML = '')
                }
            }).getContent() as Node
                    ))
                }
            }),
            Button({
                children: 'Удалить чат',
                onClick: () => {
                    settingsVisibleHandler()
                    ChatActions.deleteChat().then()
                }
            })
        ],
        listStyle: styles.chatSettingsList_hidden,
        id: 'chat-content-settings'
    })
    const mapStateToProps = (state: IState) => {
        const chat = state.chats.list.find(chat => chat.id === id)
        if (!chat?.messages) return { listStyle: styles.chatHistory, itemStyle: styles.messageItemStyle, items: [] }
        const userId = state.user?.id as number
        const listId = `chat-history-${chat.id}`
        waitElement(listId).then(element => element.scrollTop = element.scrollHeight)
        return {
            listStyle: styles.chatHistory,
            itemStyle: styles.messageItemStyle,
            items: (state.chats.list.find(chat => chat.id === id) as IChat).messages
                .map(message => ChatMessage(userId, message)),
            id: listId
        }
    }

    const sendMessageHandler = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        const valid = validateFields({
            ...validationProps,
            submitAction: true
        })
        if (valid) {
            const message = (getFormData() as IChatsFormData).message
            WSClient.send(id, { content: message, type: 'message' })
        }
    }
    return Block(template, {
        contactName: title,
        letterAvatar: LetterAvatar(title, styles.avatar),
        chatSettingsButton: Button({
            style: styles.chatBtnSettings,
            onClick: settingsVisibleHandler
        }),
        settingsList: settings,
        messageList: connect(
            List(
                mapStateToProps(Store.getState())
            ),
            mapStateToProps,
            STORE_EVENTS.CHAT_UPDATED_SUCCESS
        ),
        clipFileButton: Button({ style: styles.chatBtnClip }),
        messageForm: Form({
            children: Input({
                style: styles.message,
                name: 'message',
                type: 'text',
                label: '',
                attr: 'data-message',
                placeholder: 'Сообщение',
                actions: {
                    blur: () => validateFields(validationProps),
                    keyup: (e: KeyboardEvent) => {
                        if (e.key === 'Enter') sendMessageHandler(e)
                    }
                }
            }),
            style: styles.messageForm,
            actions: {
                submit: sendMessageHandler
            }
        }),
        sendMessageButton: Button({
            style: styles.chatBtnSend,
            onClick: sendMessageHandler
        })
    })
}
