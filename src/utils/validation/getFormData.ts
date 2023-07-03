export const getFormData = () => {
    let data = {}
    const inputs = document.getElementsByTagName('input')
    Object.entries(inputs)
        .map((arr) => arr[1])
        .forEach((input) => {
            data = { ...data, [input.name]: input.value }
        })
    console.log(data)
}
