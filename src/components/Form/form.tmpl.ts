export const template = `<form
        {{#if id}}
            id={{id}}
        {{/if}}
        {{#if style}}
            class={{style}}
        {{/if}}
        method="post"
        action=""
        encType="multipart/form-data"
        novalidate="novalidate"
    >
        {{{children}}}
    </form>`
