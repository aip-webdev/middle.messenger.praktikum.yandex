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
import { Indexed, IPasswordsData, IUserData } from '../types'

function UserActions() {
    const changeUserData = () => {
        const userData = getFormData()
        if (isEqual(userData, omit(['id', 'avatar'], Store.getState()?.user as unknown as Indexed))) {
            Router.back()
            return new Promise(() => {
            })
        }
        return UserApi.changeUserData(userData as IUserData).then((req) => {
            const userInfo = req.data as IUserData
            Store.set('user', userInfo, STORE_EVENTS.USER_UPDATED_SUCCESS)
        })
    }

    const changePassword = () => {
        const passwordsData = getFormData()
        return UserApi.changePassword(passwordsData as IPasswordsData).then(() => {
            Store.set('error', '', STORE_EVENTS.PASSWORD_CHANGE_SUCCESS)
        })
    }

    const changeAvatar = (target: EventTarget) => {
        const form = new FormData(target as HTMLFormElement)
        return UserApi.changeAvatar(form).then((req) => {
            const data = req.data as unknown
            Store.merge({ user: omit(['status'], data as Indexed), error: '' }, STORE_EVENTS.USER_AVATAR_CHANGED_SUCCESS)
        }).catch(e =>
            Store.set('error', e, STORE_EVENTS.USER_AVATAR_CHANGED_FAILURE)
        )
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
