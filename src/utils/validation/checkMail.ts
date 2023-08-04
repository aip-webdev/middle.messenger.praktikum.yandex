import { isEmpty } from '../common/isEmpty.ts'
import { checkInputWithRegExp } from './helpers'

export const checkMail = (textErrorStyle?: string, style?: string, errorStyle?: string) => {
    let correct = true
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const mailInput = document.querySelector('[data-email]') as HTMLInputElement

    if (!isEmpty(mailInput.value)) {
        correct = checkInputWithRegExp(mailInput, regexp, 'Некорректный email', textErrorStyle, style, errorStyle)
    }
    return correct
}
