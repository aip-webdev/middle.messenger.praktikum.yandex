import {checkForEmptyFields} from "../../utils/validation/checkForEmptyFields.js";
import styles from "./UserInfo.module.scss";
import {checkPasswordFields} from "../../utils/validation/checkPassworFields.js";
import {pushHistory} from "../../routing/index.js";
import {List} from "../List/index.js";
import {Input} from "../Input/index.js";
import {Form} from "../Form/index.js";
import {Button} from "../Button/index.js";

export const getEditPasswordElements = () => {
    const handleClick = () => {
        checkForEmptyFields(styles.infoValue, styles.infoValueError, styles.textError) &&
        checkPasswordFields(styles.infoValue, styles.infoValueError, styles.textError) ?
            pushHistory('/profile') : {}
    }

    let items =
        List({
            listStyle: styles.userInfoList,
            itemStyle: styles.userInfoListItem,
            items: editPasswordFields.map(({name, title}) =>
                `
                    <span>${title}</span>
                    ${Input(
                            styles.infoValue,
                            name,
                            'password',
                            null,
                            name === 'newPassword' ? `data-password` : null,
                            '******'
                )}
                `
            )
        })
    return Form({
        children: `
                ${items}
                ${Button({children: 'Сохранить', onClick: handleClick, style: styles.saveBtn})}
                `,
        style: styles.form
    })
}

const editPasswordFields = [{
    title: 'Старый пароль',
    name: 'oldPassword'
}, {
    title: 'Новый пароль',
    name: 'newPassword'
}, {
    title: 'Повторите новый пароль',
    name: 'newPassword'
}]
