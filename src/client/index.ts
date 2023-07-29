import { App } from '../index.ts'
import { render } from '../utils/elements/render.ts'

document.addEventListener('DOMContentLoaded', () => render('app', App()))
