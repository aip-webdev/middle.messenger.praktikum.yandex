import { checkEmptyValue } from './checkEmptyValue.ts'

export const checkMessage = (textErrorStyle?: string, style?: string, errorStyle?: string) => {
    const messageInputs = document.querySelectorAll('[data-message]') as NodeListOf<HTMLInputElement>

    return checkEmptyValue(messageInputs, textErrorStyle, style, errorStyle)
}
