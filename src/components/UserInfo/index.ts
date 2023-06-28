import { getEditPasswordElements } from './getEditPasswordElements.ts'
import { getUserInfoElements } from './getUserInfoElements.ts'
import { IUserInfoProps } from './types'
import Block from '../../utils/elements/Block.ts'
import { waitElement } from '../../utils/elements/waitElement.ts'
import { dataPhonePattern } from '../../utils/validation/dataPhonePattern.ts'

export const UserInfo = ({
    userinfo,
    edit = false,
    editPass = false
}: IUserInfoProps) => {
    waitElement('main').then(() => dataPhonePattern())
    return Block(
        '{{{content}}}',
        {
            content: !editPass
                ? getUserInfoElements(userinfo, edit)
                : getEditPasswordElements()
        }
    )
}
