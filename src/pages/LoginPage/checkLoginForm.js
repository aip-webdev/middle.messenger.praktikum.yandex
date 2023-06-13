import {pushHistory} from "../../routing/index.js";
import {checkForEmptyFields} from "../../utils/validation/checkForEmptyFields.js";
import {formSubmitEvent} from "../../utils/events/formSubmitEvent.js";

export const checkLoginForm = () => formSubmitEvent('[data-form-login]', (e) => {
    e.preventDefault()
    checkForEmptyFields() ? pushHistory('/chats') : null
})
