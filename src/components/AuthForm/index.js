import styles from './AuthForm.module.scss'
import {List} from "../List/index.js";
import {Form} from "../Form/index.js";
import {Input} from "../Input/index.js";
import {H3} from "../Titles/index.js";
import {Button} from "../Button/index.js";
import Handlebars from "handlebars";
import {pushHistory} from "../../routing/index.js";
import {checkMail} from "../../utils/validation/checkEmailFields.js";
import {checkForEmptyFields} from "../../utils/validation/checkForEmptyFields.js";
import {checkPasswordFields} from "../../utils/validation/checkPassworFields.js";

export const AuthForm = (title, submitBtnText, changeBtnText, action, changeFormRoute, inputsInfo) => {
    const inputs = inputsInfo.map((info) =>
        Input(styles.inputField, info.name, info.type, info.label, info.attr, info.placeholder)
    )
    const handlerSubmit = () => {
        switch (action) {
            case 'registration': {
                checkMail() && checkForEmptyFields() && checkPasswordFields() ?
                    pushHistory('/chats') : null
                break
            }
            case 'authorization': {
                checkForEmptyFields() ? pushHistory('/chats') : null
                break
            }
        }
    }
    const handlerChange = () => pushHistory(changeFormRoute)

    return Handlebars.compile(
        Form({
                children: `
            ${H3(title)}
            ${List({listStyle: styles.list, itemStyle: styles.listItem, items: inputs})}
            ${Button({children: submitBtnText, onClick: handlerSubmit, style: styles.button_submit})}
            ${Button({children: changeBtnText, onClick: handlerChange, style: styles.button_change})}
        `,
                style: styles.authForm
            }
        )
    )()
}
