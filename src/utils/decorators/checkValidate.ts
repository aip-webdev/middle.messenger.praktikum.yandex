import { validateFields, ValidateProps } from '../validation/validateFields.ts'

function checkValidate(f: AnyFun, { ...args }: ValidateProps) {
    return function() {
        if (validateFields(args)) {
            return f.apply(this, arguments)
        }
    }
}

export default checkValidate
