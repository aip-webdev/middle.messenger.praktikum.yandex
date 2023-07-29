import { errorInputText } from './errorInputText.ts'
import { removeErrorText, setErrorStyle } from './helpers.ts'
import { isEmpty } from '../common/isEmpty.ts'

export const checkPhoneNumber = (textErrorStyle?: string, style?: string, errorStyle?: string) => {
    const phoneInput = document.querySelector('[data-phone]') as HTMLInputElement
    const phoneRegex = /^\+?\d{10,15}$/
    let correct = true
    const val = phoneInput.value.replace(/\D/g, '')
    if (!isEmpty(val) && !phoneRegex.test(val)) {
        correct = false
        const errorText = errorInputText('Длина телефона должна составлять 10-15 символов', textErrorStyle)
        removeErrorText(phoneInput)
        setErrorStyle(phoneInput, errorText, style, errorStyle)
    }
    return correct
}
