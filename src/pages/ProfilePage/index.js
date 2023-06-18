import styles from './ProfilePage.module.scss'
import {ImageAvatar} from "../../components/ImageAvatar/index.js";
import {Button} from "../../components/Button/index.js";
import {pushHistory} from "../../routing/index.js";
import Handlebars from 'handlebars';

export const ProfilePage = (children) => {
    const handleClick = () => pushHistory('/chats')
    return Handlebars.compile(`
        <div class=${styles.profile}>
            <nav class=${styles.nav}>
               ${Button({onClick: handleClick, style: styles.arrowBtn})}
            </nav>
            <section class=${styles.profileContent}>
                ${ImageAvatar()}
                <div id='profile-content'>${children}</div>
            </section>
        </div>
    `)()
}
