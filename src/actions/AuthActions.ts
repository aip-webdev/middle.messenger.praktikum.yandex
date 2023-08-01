import { VALIDATION_TYPE } from '../utils/validation/validateFields.ts'
import AuthApi from '../api/AuthApi.ts'
import { STORE_EVENTS } from '../store/storeEvents.ts'
import checkFailurePromise from '../utils/decorators/checkFailureResponse.ts'
import { getFormData } from '../utils/validation/getFormData.ts'
import checkValidate from '../utils/decorators/checkValidate.ts'
import { isEmpty } from '../utils/common/isEmpty.ts'
import Store from '../store'
import UserApi from '../api/UserApi.ts'
import { ILoginData, IUserData } from '../types'

function AuthActions() {
    const login = async (loginData: ILoginData | unknown) => {
        let successEvents = [STORE_EVENTS.LOGIN_USER_SUCCESS]
        if (!loginData) loginData = getFormData()
        if (isEmpty((loginData as ILoginData).login) || isEmpty((loginData as ILoginData).password)) {
            loginData = { login: 'initlogin', password: '1InitPass' }
            successEvents = [...successEvents, STORE_EVENTS.INIT]
        }
        await AuthApi.login(loginData as ILoginData)
        return Store.merge({ auth: true, error: { code: null, reason: '' } }, ...successEvents)
    }
    const logout = async () => {
        await AuthApi.logout()
        return Store.merge({ auth: false, error: { code: null, reason: '' }, user: null }, STORE_EVENTS.LOGOUT_USER_SUCCESS)
    }

    const register = () =>
        AuthApi.registration(getFormData() as IUserData)
            .then(() =>
                Store.merge(
                    { auth: true, error: { code: null, reason: '' } },
                    STORE_EVENTS.REGISTER_SUCCESS, STORE_EVENTS.LOGIN_USER_SUCCESS
                )
            )

    const updateUserInfo = () => AuthApi.getUser().then((res) => {
        let userInfo = res.data as IUserData
        UserApi.getUserById(userInfo.id as number).then(res => {
            userInfo = res.data as IUserData
            Store.set('user', userInfo, STORE_EVENTS.GET_USER_DATA_SUCCESS)
        })
    })

    return Object.freeze({
        login: function(validate = true) {
            return validate ? checkValidate(
                checkFailurePromise(login, STORE_EVENTS.LOGIN_USER_FAILURE),
                {
                    validation: VALIDATION_TYPE.SIGN_IN,
                    submitAction: true
                }
            )() : checkFailurePromise(login, STORE_EVENTS.INIT)()
        },
        logout: checkFailurePromise(logout, STORE_EVENTS.LOGOUT_USER_FAILURE),
        register: checkValidate(checkFailurePromise(register, STORE_EVENTS.REGISTER_FAILURE), {
            validation: VALIDATION_TYPE.SIGN_UP,
            submitAction: true
        }),
        updateUserInfo: checkFailurePromise(updateUserInfo, STORE_EVENTS.GET_USER_DATA_FAILURE)
    })
}

export default AuthActions()
