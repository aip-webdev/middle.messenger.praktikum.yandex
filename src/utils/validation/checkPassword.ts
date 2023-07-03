import { errorInputText } from './errorInputText.js'
import { checkInputWithRegExp, removeErrorText, setErrorStyleList } from './helpers'
import { checkEmptyValue } from './checkEmptyValue.ts'

export const checkPassword = (
    textErrorStyle?: string,
    style?: string,
    errorStyle?: string
) => {
    let correct = true
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/
    const passInputs: NodeListOf<HTMLInputElement> =
    document.querySelectorAll('[data-password]')
    const lastPassInput: HTMLInputElement = passInputs[passInputs.length - 1]
    if (passInputs[0].value !== lastPassInput.value) {
        correct = false
        const errorText = errorInputText('Пароли не совпадают', textErrorStyle)
        passInputs.forEach(input => removeErrorText(input))
        setErrorStyleList(passInputs, errorText, style, errorStyle)
        lastPassInput.parentElement
            ? lastPassInput.parentElement.appendChild(errorText)
            : null
    } else if (checkEmptyValue(passInputs, textErrorStyle, style, errorStyle)) {
        passInputs.forEach(input =>
            correct = checkInputWithRegExp(
                input,
                passwordRegex,
                'Длина 8-40 символов, минимум 1 заглавная буква и 1 цифра',
                textErrorStyle,
                style,
                errorStyle
            )
        )
    } else {
        correct = false
    }
    return correct
}
