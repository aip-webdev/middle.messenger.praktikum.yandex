import styles from './UserInfo.module.scss'
import { List } from '../List'
import { Input } from '../Input'
import { Form } from '../Form'
import { Button } from '../Button'
import Block from '../../core/Block.ts'
import UserActions from '../../actions/UserActions.ts'

export const getEditPasswordElements = () => {
    const items = List({
        listStyle: styles.userInfoList,
        itemStyle: styles.userInfoListItem,
        items: editPasswordFields.map(
            ({ name, title }) =>
                Block(`
                <p>${title}</p>
                    {{{input}}}
                `, {
                    input: Input({
                        style: styles.infoValue,
                        name: name,
                        type: 'password',
                        label: '',
                        attr:
              name === 'newPassword' ? 'data-password' : undefined,
                        placeholder: '******'
                    })
                })
        )
    })
    return Form({
        children: Block(`
                {{{items}}}
                {{{button}}}
                `, {
            button: Button({
                children: 'Сохранить',
                onClick: () => UserActions.changePassword(),
                style: styles.saveBtn
            }),
            items: items
        }),
        style: styles.form
    })
}

const editPasswordFields = [
    {
        title: 'Старый пароль',
        name: 'oldPassword'
    },
    {
        title: 'Новый пароль',
        name: 'newPassword'
    },
    {
        title: 'Повторите новый пароль',
        name: 'newPassword'
    }
]
