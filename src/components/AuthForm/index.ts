import styles from './AuthForm.module.scss'
import { List } from '../List'
import { Form } from '../Form'
import { IInputProps, Input } from '../Input'
import { H3 } from '../Titles'
import { Button } from '../Button'
import Block from '../../core/Block.ts'
import { template } from './authform.tmpl.ts'
import { validateFields } from '../../utils/validation/validateFields.ts'

interface AuthFormParams {
  title: string;
  submitBtnText: string;
  changeBtnText: string;
  validation: string;
  inputsInfo: IInputProps[];
  onSubmit: () => void;
  onChange: () => void;
}

export function AuthForm({
    title,
    submitBtnText,
    changeBtnText,
    validation,
    inputsInfo,
    onSubmit,
    onChange
}: AuthFormParams) {
    const inputs = inputsInfo.map((info: IInputProps) =>
        Input({
            ...info,
            style: styles.inputField,
            actions: {
                blur: () => validateFields({ validation })
            }
        })
    )

    const handleSubmit = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        onSubmit()
    }

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
                onClick: handleSubmit,
                style: styles.button_submit,
                type: 'submit'
            }),
            secondButton: Button({
                children: changeBtnText,
                onClick: onChange,
                style: styles.button_change
            })
        }),
        style: styles.authForm
    })
}
