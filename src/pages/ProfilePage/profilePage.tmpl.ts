export const template = `
        <div class={{containerClassName}}>
            <nav class={{navClassName}}>
               {{{toChats}}}
            </nav>
            <section class={{profileContentClassName}}>
                {{{avatar}}}
                <div id='profile-content'>{{{children}}}</div>
            </section>
        </div>
    `
