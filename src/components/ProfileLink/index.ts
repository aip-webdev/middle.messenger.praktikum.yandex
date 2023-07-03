import styles from './ProfileLink.module.scss'
import { Link } from '../Link'
import { pushHistory } from '../../routing'
import Block from '../../utils/elements/Block.ts'

export const ProfileLink = () =>
    Block(`
    <div class={{containerClassName}}>
        {{{link}}}
    </div>
`, {
        link: Link({
            children: 'Профиль',
            onClick: () => pushHistory('/profile'),
            style: styles.profileLink
        }),
        containerClassName: styles.container
    })
