import {pushHistory} from "../../routing/index.js";
import {checkForEmptyFields} from "../../utils/validation/checkForEmptyFields.js";
import {formSubmitEvent} from "../../utils/events/formSubmitEvent.js";
import {checkPasswordFields} from "../../utils/validation/checkPassworFields.js";

export const checkUserInfoForm = (style, errorStyle, textErrorStyle, attr, edit = false) =>
    formSubmitEvent(`[${attr}]`, (e) => {
        e.preventDefault()
        let checkResult = !!edit ?
            checkForEmptyFields(style, errorStyle, textErrorStyle, true) :
            checkForEmptyFields(style, errorStyle, textErrorStyle) && checkPasswordFields(style, errorStyle, textErrorStyle)
        checkResult ? pushHistory('/profile') : null
    })
