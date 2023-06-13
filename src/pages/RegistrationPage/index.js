import {authForm} from '../../components/AuthForm/index.js';
import {mainLoaded} from "../../utils/events/mainLoaded.js";
import {dataPhonePattern} from "../../utils/validation/dataPhonePattern.js";
import {checkRegistrationForm} from "./checkRegistrationForm.js";
import {registrationFormInputs} from "./registrationFormInputs.js";
export const registrationPage = () => {
    mainLoaded(() => {
        checkRegistrationForm()
        dataPhonePattern()
    })
    return authForm(
        'Регистрация',
        'Зaрегистрироваться',
        'Войти',
        '/signIn',
        registrationFormInputs,
        'data-form-registration'
    )
}
