import {waitElement} from "../waitElement.js";

export const clickEvent = (id, handler) => waitElement(id).then((element) =>
    element.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        let target = e.target
        while (target.parentNode && target.id !== id) {
            target = target.parentNode;
        }
        if(target.id === id) {
            handler(e)
        }
    })
)
