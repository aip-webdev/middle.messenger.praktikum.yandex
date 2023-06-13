export const formSubmitEvent = (attr, handler) => {
    const forms = document.querySelectorAll(attr)
    forms.forEach((form) => {
        form.addEventListener('submit', handler)
    })
}
