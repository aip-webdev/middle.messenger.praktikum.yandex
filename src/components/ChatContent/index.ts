import styles from './ChatContent.module.scss'
import { LetterAvatar } from '../LetterAvatar'
import { ChatMessage } from '../ChatMessage'
import { Form } from '../Form'
import { Input } from '../Input'
import { Button } from '../Button'
import { template } from './chatContent.tmpl.ts'
import { IChat } from '../../pages/ChatPage/types'
import Block from '../../utils/elements/Block.ts'
import { validateFields, VALIDATION_TYPE } from '../../utils/validation/validateFields.ts'

const validationProps = {
    validation: VALIDATION_TYPE.MESSAGE,
    style: styles.message,
    errorStyle: styles.messageError,
    textErrorStyle: styles.textError
}
export const ChatContent = ({ name, lastMessage }: IChat) =>
    Block(template, {
        contactName: name,
        letterAvatar: LetterAvatar(name, styles.avatar),
        chatSettingsButton: Button({ style: styles.chatBtnSettings }),
        chatMessage: ChatMessage(lastMessage),
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
                    blur: () => validateFields(validationProps)
                }
            }),
            style: styles.messageForm
        }),
        sendMessageButton: Button({
            style: styles.chatBtnSend,
            onClick: () => validateFields({
                ...validationProps,
                submitAction: true
            })
        })
    })
