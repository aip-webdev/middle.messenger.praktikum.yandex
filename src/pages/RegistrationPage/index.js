import {AuthForm} from '../../components/AuthForm/index.js';
import {mainLoaded} from "../../utils/events/mainLoaded.js";
import {dataPhonePattern} from "../../utils/validation/dataPhonePattern.js";
import {registrationFormInputs} from "./registrationFormInputs.js";

export const RegistrationPage = () => {
    mainLoaded(() => {
        dataPhonePattern()
    })
    return AuthForm(
        'Регистрация',
        'Зaрегистрироваться',
        'Войти',
        'registration',
        '/signIn',
        registrationFormInputs
    )
}
