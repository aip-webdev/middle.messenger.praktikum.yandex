import {isEmpty} from "./isEmpty.js";
import {errorInputText} from "../../components/AuthForm/errorInputText.js";
import {setErrorStyle} from "./helpers.js";

const emailValidation = (email) => String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )

export const checkMail = (textErrorStyle) => {
    let correct = true
    const mailInputs = document.querySelectorAll('[data-email]')
    mailInputs.forEach((input) => {
        if (!emailValidation(input.value) && !isEmpty(input.value)) {
            correct = false
            let errorText = errorInputText('Некорректный email', textErrorStyle)
            setErrorStyle(input, errorText)
        }
    })
    return correct
}
