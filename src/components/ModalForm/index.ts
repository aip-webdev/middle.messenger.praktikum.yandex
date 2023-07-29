import { Modal } from '../Modal'
import { Form } from '../Form'
import Block from '../../core/Block.ts'
import { H4 } from '../Titles'
import { Button } from '../Button'
import styles from './ModalForm.module.scss'

interface IModalFormProps {
  title: string;
  btnText: string;
  children: unknown;
  onSubmitForm: (e: Event) => void;
  formId?: string;
}

export const ModalForm = ({
    title,
    btnText,
    children,
    onSubmitForm,
    formId
}: IModalFormProps
) => Modal({
    children: Form({
        children: Block(`
                  {{{header}}}
                  {{{children}}}
                  {{{button}}}
                `, {
            header: H4(title),
            children: children,
            button: Button({
                children: btnText,
                style: styles.button_submit,
                type: 'submit'
            })
        }),
        style: styles.formStyle,
        actions: {
            submit: onSubmitForm
        },
        id: formId
    })
})
