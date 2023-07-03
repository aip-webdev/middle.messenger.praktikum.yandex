import styles from './UserInfo.module.scss'
import { pushHistory } from '../../routing'
import { prettyPhoneNumber } from '../../utils/validation/dataPhonePattern.ts'
import { List } from '../List'
import { Input } from '../Input'
import { Button } from '../Button'
import { Form } from '../Form'
import { IUserInfo, IUserInfoFields } from './types'
import Block from '../../utils/elements/Block.ts'
import { getFormData } from '../../utils/validation/getFormData.ts'
import { validateFields, VALIDATION_TYPE } from '../../utils/validation/validateFields.ts'

export const getUserInfoElements = (userInfo: IUserInfo, edit = false) => {
    const handleClick = () => {
        validateFields({
            validation: VALIDATION_TYPE.PROFILE_EDIT,
            style: styles.infoValue,
            errorStyle: styles.infoValueError,
            textErrorStyle: styles.textError,
            fillFromPlaceholder: true,
            submitAction: true
        })
            ? pushHistory('/profile')
            : {}
        getFormData()
    }
    const info = {
        ...userInfo,
        phone: prettyPhoneNumber(userInfo.phone).toString()
    }
    const items = !edit
        ? List({
            listStyle: styles.userInfoList,
            itemStyle: styles.userInfoListItem,
            items: Object.keys(userInfoFields).map(
                (key) => `
                <span>${userInfoFields[key as keyof IUserInfoFields]}</span>
                <span class="${styles.infoValue}">${info[key as keyof IUserInfo]}</span>
            `
            )
        })
        : List({
            listStyle: styles.userInfoList,
            itemStyle: styles.userInfoListItem,
            items: Object.keys(userInfoFields).map(
                (key) => Block(`
                <p>${userInfoFields[key as keyof IUserInfoFields]}</p>
                {{{input}}}
            `, {
                    input: Input({
                        style: styles.infoValue,
                        name: key,
                        type: getType(key),
                        label: '',
                        attr: getAttr(key),
                        placeholder: info[key as keyof IUserInfo].replace(' ', ''),
                        actions: {
                            blur: () => validateFields({
                                validation: VALIDATION_TYPE.PROFILE_EDIT,
                                style: styles.infoValue,
                                errorStyle: styles.infoValueError,
                                textErrorStyle: styles.textError,
                                fillFromPlaceholder: true
                            })
                        }
                    })
                })
            )
        })

    return !edit
        ? Block(`
          {{{items}}}
          {{{buttons}}}
        `, {
            items: items,
            buttons: List({
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
                        onClick: () => pushHistory('/profile/password'),
                        style: styles.editBtn
                    }),
                    Button({
                        children: 'Выйти',
                        onClick: () => pushHistory('/login'),
                        style: styles.logoutBtn
                    })
                ]
            })
        })
        : Form({
            children: Block(`
              {{{items}}}
              {{{button}}}
            `, {
                items: items,
                button: Button({
                    children: 'Сохранить',
                    onClick: handleClick,
                    style: styles.saveBtn
                })
            }),
            style: styles.form
        })
}

const userInfoFields: IUserInfoFields = {
    email: 'Почта',
    login: 'Логин',
    first_name: 'Имя',
    last_name: 'Фамилия',
    display_name: 'Имя в чате',
    phone: 'Телефон'
}

const getAttr = (key: string) => {
    if (key.includes('name')) {
        return 'data-name'
    } else {
        return `data-${key}`
    }
}

const getType = (field: string) => {
    switch (field) {
    case 'email':
        return 'email'
    case 'phone':
        return 'tel'
    }
    return 'text'
}
