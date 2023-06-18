import styles from "../../components/AuthForm/AuthForm.module.scss";

export const setErrorStyle = (input, errorText, style, errorStyle) => {
    input.className = !!errorStyle ? errorStyle : styles.inputFieldError
    const eventHandler = (e) => {
        e.target.className = !!style ? style : styles.inputField
        errorText.remove()
    }
    Array.of('input', 'click').forEach((event) => {
        input.addEventListener(event, eventHandler);
    })
    input.parentElement.appendChild(errorText)
}

export const setErrorStyleList = (inputs, errorText, style, errorStyle) => {
    inputs.forEach((input) => {
        input.className = !!errorStyle ? errorStyle : styles.inputFieldError
        const eventHandler = () => inputs.forEach((el) => {
            el.className = !!style ? style : styles.inputField
            errorText.remove()
        })
        Array.of('input', 'click').forEach((event) => {
            input.addEventListener(event, eventHandler);
        })
    })
}
