export const dataPhonePattern = () => {
    const eventHandler = (e: InputEvent | Event | FocusEvent) => {
        const el = e.target,
            clearVal = (el as HTMLInputElement).dataset.phoneClear,
            matrix = '+7(___) ___-__-__',
            def = matrix.replace(/\D/g, '')
        let val = (e.target as HTMLInputElement).value.replace(/\D/g, '')
        if (clearVal !== 'false' && e.type === 'blur') {
            const numbersLength = matrix.match(/([ \d])/g)?.length
            if (!!numbersLength && val.length < numbersLength) {
                (e.target as HTMLInputElement).value = ''
                return
            }
        }
        if (def.length >= val.length) val = def;
        (e.target as HTMLInputElement).value = prettyPhoneNumber(val, matrix)
    }
    const phoneInputs = document.querySelectorAll('[data-phone]')
    phoneInputs.forEach((elem) => {
        ['input', 'blur', 'focus'].forEach((event) => {
            elem.addEventListener(event, eventHandler)
        })
    })
}

export const prettyPhoneNumber = (
    phone: string,
    matrix = '+7(___) ___-__-__'
) => {
    let i = 0
    phone = phone.replace(/\D/g, '')
    return matrix.replace(/./g, (string) =>
        /[_\d]/.test(string) && i < phone.length
            ? phone.charAt(i++)
            : i >= phone.length
                ? ''
                : string
    )
}
