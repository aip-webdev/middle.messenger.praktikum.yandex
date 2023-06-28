export const template = `
        <div class={{containerClassName}}>
            <nav class={{navClassName}}>
                {{{toProfile}}}
                {{{search}}}
                {{{chats}}}
            </nav>
            <section id='chat-content' class={{chatContentClassName}}>
                <div class={{emptyContentClassName}}>
                        <div>Выберите чат, чтобы отправить сообщение</div>
                </div>
            </section>
        </div>
    `
