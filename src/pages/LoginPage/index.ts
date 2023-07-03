import { AuthForm } from '../../components/AuthForm'
import { loginFormInputs } from './loginFormInputs.ts'
import { VALIDATION_TYPE } from '../../utils/validation/validateFields.ts'

export const LoginPage = () =>
    AuthForm({
        title: 'Вход',
        submitBtnText: 'Авторизоваться',
        changeBtnText: 'Нет аккаунта?',
        validation: VALIDATION_TYPE.SIGN_IN,
        changeFormRoute: '/registration',
        inputsInfo: loginFormInputs
    })
