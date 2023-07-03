import styles from './UserInfo.module.scss'
import { pushHistory } from '../../routing'
import { List } from '../List'
import { Input } from '../Input'
import { Form } from '../Form'
import { Button } from '../Button'
import Block from '../../utils/elements/Block.ts'
import { validateFields, VALIDATION_TYPE } from '../../utils/validation/validateFields.ts'

export const getEditPasswordElements = () => {
    const handler = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        validateFields({
            validation: VALIDATION_TYPE.PASSWORD_CHANGE,
            style: styles.infoValue,
            errorStyle: styles.infoValueError,
            textErrorStyle: styles.textError,
            submitAction: true
        })
            ? pushHistory('/profile')
            : {}
    }

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
                onClick: handler,
                style: styles.saveBtn,
                type: 'submit'
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
