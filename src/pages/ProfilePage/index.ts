import styles from './ProfilePage.module.scss'
import { ImageAvatar } from '../../components/ImageAvatar'
import { Button } from '../../components/Button'
import { pushHistory } from '../../routing'
import { template } from './profilePage.tmpl.js'
import Block from '../../utils/elements/Block.ts'

export const ProfilePage = (children?: unknown) => {
    const handleClick = () => pushHistory('/chats')
    return Block(template, {
        toChats: Button({ onClick: handleClick, style: styles.arrowBtn }),
        avatar: ImageAvatar(),
        children: children,
        containerClassName: styles.container,
        navClassName: styles.nav,
        profileContentClassName: styles.profileContent
    })
}
