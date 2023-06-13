import {errorInputText} from "../../components/AuthForm/errorInputText.js";
import {setErrorStyleList} from "./helpers.js";
import {checkEmptyValue} from "./checkForEmptyFields.js";

export const checkPasswordFields = (style = null, errorStyle = null, textErrorStyle = null) => {
    let correct = true
    const passInputs = document.querySelectorAll(`[data-password]`)
    let lastPassInput = passInputs[passInputs.length - 1]
    if (passInputs[0].value !== lastPassInput.value) {
        correct = false
        let errorText = errorInputText('Пароли не совпадают', textErrorStyle)
        setErrorStyleList(passInputs, errorText, style, errorStyle)
        lastPassInput.parentElement.appendChild(errorText)
    } else {
        correct = checkEmptyValue(passInputs, style, errorStyle, textErrorStyle)
    }
    return correct
}
