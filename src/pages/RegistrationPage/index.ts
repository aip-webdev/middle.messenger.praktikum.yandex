import { AuthForm } from '../../components/AuthForm'
import { registrationFormInputs } from './registrationFormInputs.ts'
import { VALIDATION_TYPE } from '../../utils/validation/validateFields.ts'
import AuthActions from '../../actions/AuthActions.ts'
import Router from '../../routing/Router.ts'
import { ROUTES } from '../../routing'

export const RegistrationPage = () =>
    AuthForm({
        title: 'Регистрация',
        submitBtnText: 'Зaрегистрироваться',
        changeBtnText: 'Войти',
        validation: VALIDATION_TYPE.SIGN_UP,
        inputsInfo: registrationFormInputs,
        onSubmit: () => AuthActions.register(),
        onChange: () => Router.go(ROUTES.LOGIN)
    })

