import styles from './ChatContent.module.scss'
import {LetterAvatar} from "../LetterAvatar/index.js";
import {ChatMessage} from "../ChatMessage/index.js";
import {Form} from "../Form/index.js";
import {Input} from "../Input/index.js";
import {Button} from "../Button/index.js";
import Handlebars from "handlebars";

export const ChatContent = ({id, name, lastMessage, unreadCount}) => {
    return Handlebars.compile(`
        <div class=${styles.chatContent}>
            <div class=${styles.top}>
                <div class=${styles.userBlock}>
                    ${LetterAvatar(name, styles.avatar)}
                    <p class=>${name}</p>
                </div>
                ${Button({style: styles.chatBtnSettings})}
            </div>
            <div class=${styles.chatHistory}>
                ${ChatMessage(lastMessage)}             
            </div>
            <div class=${styles.foot}>
                ${Button({style: styles.chatBtnClip})}
                ${Form({
                    children: Input(styles.input, 'message', 'text', null, null, 'Сообщение'),
                    style: styles.messageForm
                })}
                ${Button({style: styles.chatBtnSend})}
            </div>
        </div>
    `
)()
}
