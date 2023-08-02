import styles from './UserInfo.module.scss'
import { prettyPhoneNumber } from '../../utils/validation/dataPhonePattern.ts'
import { List } from '../List'
import { Input } from '../Input'
import { Button } from '../Button'
import { Form } from '../Form'
import Block from '../../core/Block.ts'
import { validateFields, VALIDATION_TYPE } from '../../utils/validation/validateFields.ts'
import Router from '../../routing/Router.ts'
import { ROUTES } from '../../routing'
import AuthActions from '../../actions/AuthActions.ts'
import { IUserInfoFields } from './types'
import Store, { IState } from '../../store'
import { connect } from '../../store/connect.ts'
import { STORE_EVENTS } from '../../store/storeEvents.ts'
import { keys } from '../../utils/common/object.ts'
import UserActions from '../../actions/UserActions.ts'

export const getUserInfoElements = (edit = false) => {
    const successEvents = [STORE_EVENTS.GET_USER_DATA_SUCCESS, STORE_EVENTS.USER_UPDATED_SUCCESS]
    const fieldsList = !edit ?
        connect(
            List(mapStateToPropsNoEdit(Store.getState())),
            mapStateToPropsNoEdit,
            ...successEvents
        ) :
        connect(
            List(mapStateToPropsEdit(Store.getState())),
            mapStateToPropsEdit,
            ...successEvents
        )
    return !edit
        ? Block(`
          {{{items}}}
          {{{buttons}}}
        `, {
            items: fieldsList,
            buttons: List({
                listStyle: styles.userInfoList,
                itemStyle: styles.userInfoListItem,
                items: [
                    Button({
                        children: 'Изменить данные',
                        onClick: () => Router.go(ROUTES.SETTINGS_EDIT),
                        style: styles.editBtn
                    }),
                    Button({
                        children: 'Изменить пароль',
                        onClick: () => Router.go(ROUTES.SETTINGS_PASSWORD),
                        style: styles.editBtn
                    }),
                    Button({
                        children: 'Выйти',
                        onClick: () => AuthActions.logout(),
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
                items: fieldsList,
                button: Button({
                    children: 'Сохранить',
                    onClick: () => UserActions.changeUserData(),
                    style: styles.saveBtn
                })
            }),
            style: styles.form
        })
}

export const userInfoFields = {
    email: 'Почта',
    login: 'Логин',
    first_name: 'Имя',
    second_name: 'Фамилия',
    display_name: 'Имя в чате',
    phone: 'Телефон'
} as IUserInfoFields

const getAttr = (key: string) => key.includes('name') ? 'data-name' : `data-${key}`

const getType = (field: string) => {
    switch (field) {
    case 'email':
        return 'email'
    case 'phone':
        return 'tel'
    }
    return 'text'
}

const mapStateToPropsNoEdit = (state: IState) => {
    return {
        listStyle: styles.userInfoList,
        itemStyle: styles.userInfoListItem,
        items: Object.keys(userInfoFields).map(
            (key) => connect(
                Block(
                    `
                <span>{{userInfoField}}</span>
                <span class={{infoValueStyle}}>{{infoValue}}</span>
            `,
                    {
                        userInfoField: userInfoFields[key as keyof IUserInfoFields],
                        infoValueStyle: styles.infoValue,
                        infoValue: mapStateToUserInfo(state)[key as keyof IUserData] || ''
                    }
                ),
                (state: IState) => {
                    return {
                        userInfoField: userInfoFields[key as keyof IUserInfoFields],
                        infoValueStyle: styles.infoValue,
                        infoValue: mapStateToUserInfo(state) ? mapStateToUserInfo(state)[key as keyof IUserData] || '' : ''
                    }
                },
                STORE_EVENTS.USER_UPDATED_SUCCESS
            )
        ),
        id: 'list-userinfo-no-edit'
    }
}

const mapStateToPropsEdit = (state: IState) => {
    const info = mapStateToUserInfo(state)
    const inputHandler = () => validateFields({
        validation: VALIDATION_TYPE.PROFILE_EDIT,
        style: styles.infoValue,
        errorStyle: styles.infoValueError,
        textErrorStyle: styles.textError,
        fillFromPlaceholder: true
    })
    return {
        listStyle: styles.userInfoList,
        itemStyle: styles.userInfoListItem,
        items: keys(userInfoFields).map(
            (key) => Block(`
                <p>${userInfoFields[key as keyof IUserInfoFields]}</p>
                {{{input}}}
            `, {
                input: Input({
                    style: styles.infoValue,
                    name: key,
                    type: getType(key),
                    attr: getAttr(key),
                    placeholder: info ? info[key as keyof IUserInfoFields]?.replace(' ', '') : '',
                    actions: {
                        blur: inputHandler,
                        click: inputHandler
                    }
                })
            })
        ),
        id: 'list-userinfo-edit'
    }
}
const mapStateToUserInfo = (state: IState) => {
    const userInfo = {
        first_name: state.user?.first_name || '',
        second_name: state.user?.second_name || '',
        display_name: state.user?.display_name || '',
        avatar: state.user?.avatar || '',
        email: state.user?.email || '',
        login: state.user?.login || '',
        phone: state.user?.phone || ''

    }
    return {
        ...userInfo,
        phone: userInfo?.phone ? prettyPhoneNumber(userInfo?.phone).toString() : ''
    } as IUserData
}
