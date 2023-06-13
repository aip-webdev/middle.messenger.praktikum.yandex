export const clickEvent = (attr, handler) => {
    const elements = document.querySelectorAll(attr)
    elements.forEach((form) => {
        form.addEventListener('click', handler)
    })
}
