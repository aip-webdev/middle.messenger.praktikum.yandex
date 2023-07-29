import Block from '../../core/Block.ts'
import styles from './Modal.module.scss'
import { waitElement } from '../../utils/elements/waitElement.ts'

interface IModalProps {
  children: unknown;
}

export const Modal = ({
    children
}: IModalProps) => {
    const handlerClick = function(e: Event) {
        if (e.target !== this) return
        waitElement('modal').then(element => element.innerHTML = '')
    }
    return Block(`
      <div class={{style}}>{{{children}}}<div>
    `, {
        style: styles.modalBack,
        children: children,
        events: {
            click: handlerClick
        }
    })
}
