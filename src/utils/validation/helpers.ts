import styles from '../../components/AuthForm/AuthForm.module.scss'
import { errorInputText } from './errorInputText.ts'

export const setErrorStyle = (
    input: HTMLInputElement,
    errorText: HTMLSpanElement,
    style?: string,
    errorStyle?: string
) => {
    input.className = errorStyle ? errorStyle : styles.inputFieldError
    const eventHandler = (e: InputEvent | MouseEvent | Event) => {

        (e.target as HTMLInputElement).className = style
            ? style
            : styles.inputField
        errorText.remove()
    }
    Array.of('input', 'click', 'blur').forEach((event) => {
        input.addEventListener(event, eventHandler)
    })
    errorText.remove()
    !!input.parentElement && input.parentElement.appendChild(errorText)
}

export const setErrorStyleList = (
    inputs: NodeListOf<HTMLInputElement>,
    errorText: HTMLSpanElement,
    style?: string,
    errorStyle?: string
) => {
    inputs.forEach((input) => {
        input.className = errorStyle ? errorStyle : styles.inputFieldError
        const eventHandler = () =>
            inputs.forEach((el) => {
                el.className = style ? style : styles.inputField
                errorText.remove()
            })
        Array.of('input', 'click').forEach((event) => {
            input.addEventListener(event, eventHandler)
        })
    })
}

export const removeErrorText = (input: HTMLInputElement) =>
    input.parentElement?.querySelectorAll('span').forEach(el => {
        el.remove()
    })

export const checkInputWithRegExp = (
    input: HTMLInputElement,
    regexp: RegExp,
    message: string,
    textErrorStyle?: string,
    style?: string,
    errorStyle?: string
) => {
    let correct = true
    if (!regexp.test(input.value)) {
        correct = false
        const errorText = errorInputText(message, textErrorStyle)
        removeErrorText(input)
        setErrorStyle(input, errorText, style, errorStyle)
    }
    return correct
}
