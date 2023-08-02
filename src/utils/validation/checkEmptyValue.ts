import { isEmpty } from '../common/isEmpty.ts'
import { errorInputText } from './errorInputText.ts'
import { removeErrorText, setErrorStyle } from './helpers'

export const checkEmptyValue = (
    list: NodeListOf<HTMLInputElement>,
    textErrorStyle?: string,
    style?: string,
    errorStyle?: string
) => {
    let correct = true
    list.forEach((input) => {
        if (isEmpty(input.value)) {
            correct = false
            input.value = ''
            const errorText = errorInputText(
                'Поле должно быть заполнено',
                textErrorStyle
            )
            removeErrorText(input)
            setErrorStyle(input, errorText, style, errorStyle)
        }
    })
    return correct
}
