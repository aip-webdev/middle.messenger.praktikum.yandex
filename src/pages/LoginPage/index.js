import Handlebars from "handlebars";
import {AuthForm} from "../../components/AuthForm/index.js";
import {loginFormInputs} from "./loginFormInputs.js";

export const LoginPage = () => {
    return Handlebars.compile(
        AuthForm(
            'Вход',
            'Авторизоваться',
            'Нет аккаунта?',
            'authorization',
            '/signUp',
            loginFormInputs
        )
    )()
}
