import { App } from '../index.ts'
import { waitElement } from '../utils/elements/waitElement.ts'

document.addEventListener('DOMContentLoaded', () => {
    const appBlock = App()
    waitElement('app').then(app => {
        app.innerHTML = ''
        app.appendChild(appBlock.getContent() as Node)
        appBlock.dispatchComponentDidMount
    })
})
