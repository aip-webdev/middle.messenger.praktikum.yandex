import styles from './AuthForm.module.scss'
import {button} from "../Button/index.js";
import {list} from "../List/index.js";
import {form} from "../Form/index.js";
import {input} from "../Input/index.js";
import {titleH3} from "../Titles/index.js";
export const authForm = (title, submitBtnText, changeBtnText, changeBtnLink, inputsInfo, formAttr) => {
    const inputs = inputsInfo.map((info) =>
        input(styles.inputField, info.name, info.type, info.label, info.attr, info.placeholder))
    return form(`
        ${titleH3(title)}
        ${list(styles.list, styles.listItem, inputs)}
        ${button(submitBtnText, styles.button_submit, 'submit')}
        ${button(changeBtnText, styles.button_change, 'button', changeBtnLink)}
    `,
        styles.authForm,
        formAttr
    )
}
