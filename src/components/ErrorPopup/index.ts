import { waitElement } from '../../utils/elements/waitElement.ts'
import Block from '../../core/Block.ts'
import styles from './ErrorPopup.module.scss'

export const errorPopup = (title: string) => {
    const handlerClick = function(e: Event) {
        if (e.target === this) return
        waitElement('error').then(element => element.innerHTML = '')
    }
    waitElement('error').then(element => {
        element.appendChild(
      Block(`<div class={{{errorBlockStyle}}}>
                        <span class={{{errorTextStyle}}} >{{{title}}}</span>
                     </div>`, {
          errorBlockStyle: styles.errorBlockStyle,
          errorTextStyle: styles.errorTextStyle,
          title: title,
          events: {
              click: handlerClick
          }

      }
      ).getContent() as Node
        )
        setTimeout(() => element.innerHTML = '', 10000)
    })
}
