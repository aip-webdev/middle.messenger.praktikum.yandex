import styles from './ProfilePage.module.scss'
import { ImageAvatar } from '../../components/ImageAvatar'
import { Button } from '../../components/Button'
import { template } from './profilePage.tmpl.js'
import Block from '../../core/Block.ts'
import Router from '../../routing/Router.ts'
import { ROUTES } from '../../routing'


export const ProfilePage = (children?: unknown) => {
    return Block(template, {
        toChats: Button({ onClick: () => Router.go(ROUTES.MESSENGER), style: styles.arrowBtn }),
        avatar: ImageAvatar(),
        children: children,
        containerClassName: styles.container,
        navClassName: styles.nav,
        profileContentClassName: styles.profileContent
    })
}
