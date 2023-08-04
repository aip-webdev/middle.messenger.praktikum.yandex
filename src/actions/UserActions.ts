import { VALIDATION_TYPE } from '../utils/validation/validateFields.ts'
import { STORE_EVENTS } from '../store/storeEvents.ts'
import checkFailurePromise from '../utils/decorators/checkFailureResponse.ts'
import { getFormData } from '../utils/validation/getFormData.ts'
import checkValidate from '../utils/decorators/checkValidate.ts'
import Store from '../store'
import UserApi from '../api/UserApi.ts'
import styles from '../components/UserInfo/UserInfo.module.scss'
import omit from '../utils/common/omit.ts'
import isEqual from '../utils/common/isEqual.ts'
import Router from '../routing/Router.ts'

function UserActions() {
    const changeUserData = async () => {
        const userData = getFormData()
        if (isEqual(userData, omit(['id', 'avatar'], Store.getState()?.user as unknown as Indexed))) {
            Router.back()
            return new Promise(() => {
            })
        }
        const req = await UserApi.changeUserData(userData as IUserData)
        const userInfo_1 = req.data as IUserData
        Store.set('user', userInfo_1, STORE_EVENTS.USER_UPDATED_SUCCESS)
    }

    const changePassword = async () => {
        const passwordsData = getFormData()
        await UserApi.changePassword(passwordsData as IPasswordsData)
        Store.set('error', '', STORE_EVENTS.PASSWORD_CHANGE_SUCCESS)
    }

    const changeAvatar = async (target: EventTarget) => {
        const form = new FormData(target as HTMLFormElement)
        try {
            const req = await UserApi.changeAvatar(form)
            const data = req.data as unknown
            Store.merge({
                user: omit(['status'], data as Indexed),
                error: ''
            }, STORE_EVENTS.USER_AVATAR_CHANGED_SUCCESS)
        } catch (e) {
            return Store.set('error', e, STORE_EVENTS.USER_AVATAR_CHANGED_FAILURE)
        }
    }
    const commonValidationProps = {
        style: styles.infoValue,
        errorStyle: styles.infoValueError,
        textErrorStyle: styles.textError,
        submitAction: true
    }

    return Object.freeze({
        changeUserData: checkValidate(checkFailurePromise(changeUserData, STORE_EVENTS.USER_UPDATED_FAILURE), {
            validation: VALIDATION_TYPE.PROFILE_EDIT,
            fillFromPlaceholder: true,
            ...commonValidationProps
        }),
        changePassword: checkValidate(checkFailurePromise(changePassword, STORE_EVENTS.PASSWORD_CHANGE_FAILURE), {
            validation: VALIDATION_TYPE.PASSWORD_CHANGE,
            ...commonValidationProps
        }),
        changeAvatar: (target: EventTarget) => changeAvatar(target)
    })
}

export default UserActions()
