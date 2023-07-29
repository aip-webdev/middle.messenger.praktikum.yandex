import { checkInputWithRegExp } from './helpers.ts'
import { isEmpty } from '../common/isEmpty.ts'

export const checkNames = (textErrorStyle?: string, style?: string, errorStyle?: string) => {
    let correct = true
    const regex = /^[A-ZА-ЯЁ][-A-Za-zА-Яа-яЁё]*$/
    const namesInputs = document.querySelectorAll('[data-name]') as NodeListOf<HTMLInputElement>
    namesInputs.forEach(input => {
        if (!isEmpty(input.value)) {
            correct = correct && checkInputWithRegExp(
                input,
                regex,
                'Первая буква должна быть заглавной(без цифр и знаков)',
                textErrorStyle,
                style,
                errorStyle
            )
        }
    })
    return correct
}
