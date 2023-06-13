
import {checkMail} from "../../utils/validation/checkEmailFields.js";
import {pushHistory} from "../../routing/index.js";
import {checkPasswordFields} from "../../utils/validation/checkPassworFields.js";
import {checkForEmptyFields} from "../../utils/validation/checkForEmptyFields.js";
import {formSubmitEvent} from "../../utils/events/formSubmitEvent.js";

export const checkRegistrationForm = (style, errorStyle) => formSubmitEvent('[data-form-registration]',(e) => {
            e.preventDefault()
            checkMail(style, errorStyle) && checkForEmptyFields(style, errorStyle) && checkPasswordFields(style, errorStyle) ?
                pushHistory('/chats') : null
        })
