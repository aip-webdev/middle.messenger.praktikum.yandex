export const template = `
    <a
        {{#if uid}}
            id={{uid}}
        {{/if}}
        class={{style}}
        {{#if link}}
            href={{link}}
        {{/if}}
    >
        {{{children}}}
    </a>
`
