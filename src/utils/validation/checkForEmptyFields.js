import {isEmpty} from "./isEmpty.js";
import {errorInputText} from "../../components/AuthForm/errorInputText.js";
import {setErrorStyle} from "./helpers.js";

export const checkForEmptyFields = (style, errorStyle, textErrorStyle, fillFromPlaceholder = false ) => {
    if (fillFromPlaceholder) {
        let inputs = document.getElementsByTagName('input')
        Object.entries(inputs)
            .map(arr => arr[1])
            .forEach(input => {
                if (isEmpty(input.value)) {
                    input.value = input.placeholder
                }
            })
    }
    const textInputs = document.querySelectorAll('[data-text]')
    const phoneInputs = document.querySelectorAll('[data-phone]')
    const mailInputs = document.querySelectorAll('[data-email]')
    const passInputs = document.querySelectorAll('[data-password]')
    return checkEmptyValue([...textInputs, ...phoneInputs, ...mailInputs, ...passInputs], style, errorStyle, textErrorStyle)
}
export const checkEmptyValue = (list, style, errorStyle, textErrorStyle) => {
    let correct = true
    list.forEach((input) => {
        if (isEmpty(input.value)) {
            correct = false
            let errorText = errorInputText('Поле должно быть заполнено', textErrorStyle)
            setErrorStyle(input, errorText, style, errorStyle)
        }
    })
    return correct
}