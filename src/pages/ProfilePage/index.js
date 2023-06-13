import styles from './ProfilePage.module.scss'
import {button} from "../../components/Button/index.js";
import {imageAvatar} from "../../components/ImageAvatar/index.js";
     export const profilePage = (children) => {
    return(`
        <div class=${styles.profile}>
            <nav class=${styles.nav}>
               ${button(
            `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="14" cy="14" r="14" transform="rotate(-180 14 14)" fill="#3369F3"/>
                        <rect x="20" y="14.8" width="11" height="1.6" transform="rotate(-180 20 14.8)" fill="white"/>
                        <path d="M13 19L9 14L13 9" stroke="white" stroke-width="1.6"/>
                    </svg>`,
                    null, 'button', '/chats', 'Вернуться к списку чатов'
                )}
            </nav>
            <section class=${styles.profileContent}>
                ${imageAvatar()}
                ${children}
            </section>
        
        </div>
    `)
}
