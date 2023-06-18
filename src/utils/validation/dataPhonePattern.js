export const dataPhonePattern = () => {
    const eventHandler = (e) => {
        let el = e.target,
            clearVal = el.dataset.phoneClear,
            matrix = '+7(___) ___-__-__',
            def = matrix.replace(/\D/g, ""),
            val = e.target.value.replace(/\D/g, "");
        if (clearVal !== 'false' && e.type === 'blur') {
            if (val.length < matrix.match(/([\_\d])/g).length) {
                e.target.value = '';
                return;
            }
        }
        if (def.length >= val.length) val = def;
        e.target.value = prettyPhoneNumber(val, matrix)
    }
    const phoneInputs = document.querySelectorAll('[data-phone]');
    phoneInputs.forEach((elem) => {
        ['input', 'blur', 'focus'].forEach((event) => {
            elem.addEventListener(event, eventHandler);
        })
    })
}

export const prettyPhoneNumber = (phone, matrix = '+7(___) ___-__-__') => {
    let i = 0
    phone = phone.replace(/\D/g, "")
    return matrix.replace(/./g, (string) =>
        /[_\d]/.test(string) && i < phone.length ? phone.charAt(i++) : i >= phone.length ? "" : string
    )
}
