import styles from './ProfileLink.module.scss'
import { Link } from '../Link'
import Block from '../../core/Block.ts'
import Router from '../../routing/Router.ts'
import { ROUTES } from '../../routing'

export const NavHeader = () =>
    Block(`
    <div class={{containerClassName}}>
        {{{link}}}
    </div>
`, {
        link: Link({
            children: 'Профиль',
            onClick: () => Router.go(ROUTES.SETTINGS),
            style: styles.navHeader
        }),
        containerClassName: styles.container
    })
