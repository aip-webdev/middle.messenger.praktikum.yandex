import styles from './AuthForm.module.scss'
import { List } from '../List'
import { Form } from '../Form'
import { IInputProps, Input } from '../Input'
import { H3 } from '../Titles'
import { Button } from '../Button'
import { pushHistory } from '../../routing'
import Block from '../../utils/elements/Block.ts'
import { template } from './authform.tmpl.ts'
import { validateFields } from '../../utils/validation/validateFields.ts'

interface AuthFormParams {
  title: string;
  submitBtnText: string;
  changeBtnText: string;
  validation: string;
  changeFormRoute: string;
  inputsInfo: IInputProps[];
}

export function AuthForm({
    title,
    submitBtnText,
    changeBtnText,
    validation,
    changeFormRoute,
    inputsInfo
}: AuthFormParams) {
    const inputs = inputsInfo.map((info: IInputProps) =>
        Input({
            ...info,
            style: styles.inputField,
            actions: { blur: () => validateFields({ validation }) }
        })
    )
    const handlerSubmit = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        const checked = validateFields({ validation, submitAction: true })
        if (checked) {
            pushHistory('/chats')
        }
    }
    const handlerChange = () => pushHistory(changeFormRoute)

    return Form({
        children: Block(template, {
            title: H3(title),
            list: List({
                listStyle: styles.list,
                itemStyle: styles.listItem,
                items: inputs
            }),
            firstButton: Button({
                children: submitBtnText,
                onClick: handlerSubmit,
                style: styles.button_submit,
                type: 'submit'
            }),
            secondButton: Button({
                children: changeBtnText,
                onClick: handlerChange,
                style: styles.button_change
            })
        }),
        style: styles.authForm
    })
}
