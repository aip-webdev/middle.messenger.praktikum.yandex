import { AuthForm } from '../../components/AuthForm'
import { loginFormInputs } from './loginFormInputs.ts'
import { VALIDATION_TYPE } from '../../utils/validation/validateFields.ts'
import AuthActions from '../../actions/AuthActions.ts'
import Router from '../../routing/Router.ts'
import { ROUTES } from '../../routing'

export const LoginPage = () =>
    AuthForm({
        title: 'Вход',
        submitBtnText: 'Авторизоваться',
        changeBtnText: 'Нет аккаунта?',
        validation: VALIDATION_TYPE.SIGN_IN,
        inputsInfo: loginFormInputs,
        onSubmit: () => AuthActions.login(),
        onChange: () => Router.go(ROUTES.SIGNUP)
    })

