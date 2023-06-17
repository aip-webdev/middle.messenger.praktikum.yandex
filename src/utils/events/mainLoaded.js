import {waitElement} from "../waitElement.js";

export const mainLoaded = (handler) => waitElement('main').then(() => handler())
