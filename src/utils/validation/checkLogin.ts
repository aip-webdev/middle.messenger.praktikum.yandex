import { checkInputWithRegExp } from './helpers.ts'
import { isEmpty } from '../common/isEmpty.ts'

export const checkLogin = (textErrorStyle?: string, style?: string, errorStyle?: string) => {
    let correct
    const regex = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/
    const loginInput = document.querySelector('[data-login]') as HTMLInputElement
    correct = !isEmpty(loginInput.value)
    if (correct) {
        correct = checkInputWithRegExp(
            loginInput,
            regex,
            'Длина 3-20 символов( латиница, цифры, \'_\', \'-\' )',
            textErrorStyle,
            style,
            errorStyle
        )
    }

    return correct
}
