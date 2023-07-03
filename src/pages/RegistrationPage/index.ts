import { AuthForm } from '../../components/AuthForm'
import { dataPhonePattern } from '../../utils/validation/dataPhonePattern.ts'
import { registrationFormInputs } from './registrationFormInputs.ts'
import { waitElement } from '../../utils/elements/waitElement.ts'
import { VALIDATION_TYPE } from '../../utils/validation/validateFields.ts'

export const RegistrationPage = () => {
    waitElement('main').then(() => dataPhonePattern())
    return AuthForm({
        title: 'Регистрация',
        submitBtnText: 'Зaрегистрироваться',
        changeBtnText: 'Войти',
        validation: VALIDATION_TYPE.SIGN_UP,
        changeFormRoute: '/login',
        inputsInfo: registrationFormInputs
    })
}
