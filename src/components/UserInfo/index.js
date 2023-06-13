import styles from './UserInfo.module.scss'
import {list} from "../List/index.js";
import {form} from "../Form/index.js";
import {input} from "../Input/index.js";
import {button} from "../Button/index.js";
import {prettyPhoneNumber} from "../../utils/validation/dataPhonePattern.js";
import {userInfoFields} from "./userInfoFields.js";
import {editPasswordFields} from "./editPasswordFields.js";
import {mainLoaded} from "../../utils/events/mainLoaded.js";
import {checkUserInfoForm} from "./checkUserInfoForm.js";

export const userInfo = (userInfo, edit = false, editPass = false) => {
    return (`
        ${!editPass ?
        userInfoElements(userInfo, edit) :
        editPasswordElements()
    }
    `)
}

const editPasswordElements = () => {
    mainLoaded(() => {
        checkUserInfoForm(styles.infoValue, styles.infoValueError, styles.textError, 'data-form-userinfo-pass')
    })
    let items =
        list(styles.userInfoList, styles.userInfoListItem, editPasswordFields.map(({name, title}) =>
            `
            <span>${title}</span>
            ${input(
                styles.infoValue,
                name, 
                'password',
                null,
                name === 'newPassword' ? `data-password` : null,
                '******')}
        `
        ))
    return form(`
                ${items}
                ${button('Сохранить', styles.saveBtn, 'submit', '', 'Сохранить')}
                `,
        styles.form,
        'data-form-userinfo-pass'
    )
}

const userInfoElements = (userInfo, edit = false) => {
    mainLoaded(() => {
        checkUserInfoForm(styles.infoValue, styles.infoValueError, styles.textError, 'data-form-userinfo-edit', true)
    })
    let info = {...userInfo, phone: prettyPhoneNumber(userInfo.phone).toString()}
    let items = !edit ?
        list(styles.userInfoList, styles.userInfoListItem, Object.keys(userInfoFields).map(key =>
            `
            <span>${userInfoFields[key]}</span>
            <span class=${styles.infoValue}>${info[key]}</span>
        `
        )) : list(styles.userInfoList, styles.userInfoListItem, Object.keys(userInfoFields).map(key =>
            `
            <span>${userInfoFields[key]}</span>
            ${input(styles.infoValue, key, getType(key), null, `data-${key}`, info[key].replace(' ', ''))}
        `
        ))
    return (!edit ? `
                ${items}
                ${list(styles.userInfoList, styles.userInfoListItem,
                [
                    button('Изменить данные', styles.editBtn, 'button', '/profile/edit'),
                    button('Изменить пароль', styles.editBtn, 'button', '/profile/changePassword'),
                    button('Выйти', styles.logoutBtn, 'button', '/signIn')
                ])}
            `
            : form(`
                ${items}
                ${button('Сохранить', styles.saveBtn, 'submit', '', 'Сохранить')}
                `,
                styles.form,
                'data-form-userinfo-edit'
            )
    )
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