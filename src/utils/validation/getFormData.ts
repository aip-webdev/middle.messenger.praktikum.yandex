import { IChatsFormData, ILoginData, IPasswordsData, IUserData } from '../../types'

type FormData = IUserData | ILoginData | IChatsFormData | IPasswordsData
export const getFormData = (): FormData => {
    let data = {}
    const inputs = document.getElementsByTagName('input')
    Object.entries(inputs)
        .map((arr) => arr[1])
        .forEach((input) => {
            data = { ...data, [input.name]: input.value }
        })
    return data as FormData
}
