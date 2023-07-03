import { isEmpty } from './isEmpty.js'
import { errorInputText } from './errorInputText.js'
import { removeErrorText, setErrorStyle } from './helpers'

const emailValidation = (email: string) =>
    String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )

export const checkMail = (textErrorStyle?: string, style?: string, errorStyle?: string) => {
    let correct = true
    const mailInputs = document.querySelectorAll('[data-email]') as NodeListOf<HTMLInputElement>
    mailInputs.forEach((input: HTMLInputElement) => {
        if (!emailValidation(input.value) && !isEmpty(input.value)) {
            correct = false
            const errorText = errorInputText('Некорректный email', textErrorStyle)
            removeErrorText(input)
            setErrorStyle(input, errorText, style, errorStyle)
        }
    })
    return correct
}
