import styles from '../../components/AuthForm/AuthForm.module.scss'

export const errorInputText = (message: string, textErrorStyle?: string) => {
    const errorText = document.createElement('span')
    errorText.className = textErrorStyle ? textErrorStyle : styles.inputTextError
    errorText.innerText = message
    return errorText
}
