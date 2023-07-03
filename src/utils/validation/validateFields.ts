import { isEmpty } from './isEmpty.ts'
import { checkEmptyValue } from './checkEmptyValue.ts'
import { checkPhoneNumber } from './checkPhoneNumber.ts'
import { checkMail } from './checkMail.ts'
import { checkPassword } from './checkPassword.ts'
import { getFormData } from './getFormData.ts'
import { checkLogin } from './checkLogin.ts'
import { checkNames } from './checkNames.ts'
import { checkMessage } from './checkMessage.ts'

interface ValidationCases {
  MESSAGE: string;
  PASSWORD_CHANGE: string;
  PROFILE_EDIT: string;
  SIGN_IN: string;
  SIGN_UP: string;
}

export const VALIDATION_TYPE = {
    MESSAGE: 'message',
    PASSWORD_CHANGE: 'profile:change',
    PROFILE_EDIT: 'profile',
    SIGN_IN: 'authorization',
    SIGN_UP: 'registration'
} as ValidationCases

interface ValidateProps {
  validation: string,
  style?: string,
  errorStyle?: string,
  textErrorStyle?: string,
  fillFromPlaceholder?: boolean,
  submitAction?: boolean
}

export const validateFields = ({
    validation = VALIDATION_TYPE.SIGN_UP,
    style,
    errorStyle,
    textErrorStyle,
    fillFromPlaceholder = false,
    submitAction = false
}: ValidateProps) => {
    let loginCheck: boolean
    let namesCheck: boolean
    let passCheck: boolean
    let mailCheck: boolean
    let phoneCheck: boolean
    let correct = true
    const inputs = document.querySelectorAll('input')
    if (fillFromPlaceholder) {
        Object.entries(inputs)
            .map((arr) => arr[1])
            .forEach((input) => {
                if (isEmpty(input.value)) {
                    input.value = input.placeholder
                }
            })
    }

    let emptyCheck

    switch (validation) {
    case VALIDATION_TYPE.SIGN_IN:
        emptyCheck = checkEmptyValue(inputs)
        loginCheck = checkLogin()
        passCheck = checkPassword()
        correct = emptyCheck && loginCheck && passCheck
        break
    case VALIDATION_TYPE.SIGN_UP:
        emptyCheck = checkEmptyValue(inputs)
        loginCheck = checkLogin()
        passCheck = checkPassword()
        mailCheck = checkMail()
        namesCheck = checkNames()
        phoneCheck = checkPhoneNumber()
        correct = loginCheck && passCheck && mailCheck && phoneCheck && namesCheck
        break
    case VALIDATION_TYPE.PROFILE_EDIT:
        emptyCheck = checkEmptyValue(inputs, textErrorStyle, style, errorStyle)
        loginCheck = checkLogin(textErrorStyle, style, errorStyle)
        mailCheck = checkMail(textErrorStyle, style, errorStyle)
        phoneCheck = checkPhoneNumber(textErrorStyle, style, errorStyle)
        namesCheck = checkNames(textErrorStyle, style, errorStyle)
        correct = emptyCheck && loginCheck && mailCheck && phoneCheck && namesCheck
        break
    case VALIDATION_TYPE.PASSWORD_CHANGE:
        emptyCheck = checkEmptyValue(inputs, textErrorStyle, style, errorStyle)
        passCheck = checkPassword(textErrorStyle, style, errorStyle)
        correct = emptyCheck && passCheck
        break
    case VALIDATION_TYPE.MESSAGE:
        correct = checkMessage(textErrorStyle, style, errorStyle)
        break
    }
    if (correct && submitAction) getFormData()
    return correct
}
