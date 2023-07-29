import Block from '../../../core/Block.ts'
import styles from '../ChatPage.module.scss'

export const EmptyContent = () =>
    Block(`<div class={{emptyContentClassName}}>
                        <div>Выберите чат, чтобы отправить сообщение</div>
                    </div>`, {
        emptyContentClassName: styles.emptyContent

    })
