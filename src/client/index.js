import {App} from "../App.js";

document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app')
    root.innerHTML = App()
})