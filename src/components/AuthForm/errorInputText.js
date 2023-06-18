import styles from "./AuthForm.module.scss";

export const errorInputText = (message, textErrorStyle) => {
    let errorText = document.createElement('span')
    errorText.className = !!textErrorStyle ? textErrorStyle : styles.inputTextError
    errorText.innerText = message
    return errorText
}
