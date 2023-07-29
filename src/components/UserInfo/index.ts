import { getEditPasswordElements } from './getEditPasswordElements.ts'
import { getUserInfoElements } from './getUserInfoElements.ts'
import { IUserInfoProps } from './types'
import Block from '../../core/Block.ts'


export const UserInfo = ({
    edit = false,
    editPass = false
}: IUserInfoProps) =>
    Block('{{{content}}}',
        {
            content: !editPass ? getUserInfoElements(edit) : getEditPasswordElements()
        }
    )




