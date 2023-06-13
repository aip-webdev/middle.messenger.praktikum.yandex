import {authForm} from "../../components/AuthForm/index.js";
import {mainLoaded} from "../../utils/events/mainLoaded.js";
import {checkLoginForm} from "./checkLoginForm.js";
import {loginFormInputs} from "./loginFormInputs.js";

export const loginPage = () => {
    mainLoaded(() => {
        checkLoginForm()
    })
    return authForm(
        'Вход',
        'Авторизоваться',
        'Нет аккаунта?',
        '/signUp',
        loginFormInputs,
        'data-form-login'
    )
}

