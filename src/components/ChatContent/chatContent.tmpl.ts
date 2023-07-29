import styles from './ChatContent.module.scss'

export const template = `
        <div class="${styles.chatContent}">
            <div class="${styles.top}">
                <div class="${styles.userBlock}">
                    {{{letterAvatar}}}
                    <p class=>{{contactName}}</p>
                </div>
                {{{chatSettingsButton}}}
            </div>
            <div class="${styles.chatHistory}">
                {{{settingsList}}}
                {{{messageList}}}
            </div>
            <div class="${styles.foot}">
                {{{clipFileButton}}}
                {{{messageForm}}}
                {{{sendMessageButton}}}
            </div>
        </div>
    `
