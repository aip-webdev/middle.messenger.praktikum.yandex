import {checkForEmptyFields} from "../../utils/validation/checkForEmptyFields.js";
import styles from "./UserInfo.module.scss";
import {pushHistory} from "../../routing/index.js";
import {prettyPhoneNumber} from "../../utils/validation/dataPhonePattern.js";
import {List} from "../List/index.js";
import {Input} from "../Input/index.js";
import {Button} from "../Button/index.js";
import {Form} from "../Form/index.js";

export const getUserInfoElements = (userInfo, edit = false) => {
    const handleClick = () => {
        checkForEmptyFields(styles.infoValue, styles.infoValueError, styles.textError, true) ?
            pushHistory('/profile') : {}
    }
    let info = {...userInfo, phone: prettyPhoneNumber(userInfo.phone).toString()}
    let items = !edit ?
        List({
            listStyle: styles.userInfoList,
            itemStyle: styles.userInfoListItem,
            items: Object.keys(userInfoFields).map(key => `
                <span>${userInfoFields[key]}</span>
                <span class=${styles.infoValue}>${info[key]}</span>
            `)
        }) :
        List({
            listStyle: styles.userInfoList,
            itemStyle: styles.userInfoListItem,
            items: Object.keys(userInfoFields).map(key => `
                <span>${userInfoFields[key]}</span>
                ${Input(styles.infoValue, key, getType(key), null, `data-${key}`, info[key].replace(' ', ''))}
            `)
        })
    return (!edit ? `
                ${items}
                ${List({
                listStyle: styles.userInfoList,
                itemStyle: styles.userInfoListItem,
                items: [
                    Button({
                        children: 'Изменить данные',
                        onClick: () => pushHistory('/profile/edit'),
                        style: styles.editBtn
                    }),
                    Button({
                        children: 'Изменить пароль',
                        onClick: () => pushHistory('/profile/changePassword'),
                        style: styles.editBtn
                    }),
                    Button({
                        children: 'Выйти',
                        onClick: () => pushHistory('/signIn'),
                        style: styles.logoutBtn
                    })
                ]
            })}
            `
            : Form({
                children: `
                    ${items}
                    ${Button({children: 'Сохранить', onClick: handleClick, style: styles.saveBtn})}
                `,
                style: styles.form
            })
    )
}

const userInfoFields = {
    email: 'Почта',
    login: 'Логин',
    first_name: 'Имя',
    last_name: 'Фамилия',
    display_name: 'Имя в чате',
    phone: 'Телефон'
}

const getType = (field) => {
    switch (field) {
        case 'email':
            return 'email'
        case 'phone':
            return 'tel'
    }
    return 'text'
}
