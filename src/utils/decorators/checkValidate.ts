import { validateFields, ValidateProps } from '../validation/validateFields.ts'
import { AnyFun } from '../../types'

function checkValidate(f: AnyFun, { ...args }: ValidateProps) {
    return function() {
        if (validateFields(args)) {
            return f.apply(this, arguments)
        }
    }
}

export default checkValidate
