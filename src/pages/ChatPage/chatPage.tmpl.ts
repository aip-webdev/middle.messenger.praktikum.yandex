export const template = `
        <div class={{containerClassName}}>
            <nav class={{navClassName}}>
                {{{toProfile}}}
                {{{search}}}
                {{{addChatBtn}}}
                {{{chats}}}
            </nav>
            <section id='chat-content' class={{chatContentClassName}}>
                {{{content}}}
            </section>
        </div>
    `
