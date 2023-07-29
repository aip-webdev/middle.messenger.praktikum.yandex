export const template = `
    {{#if label}}
    <label for={{name}}>{{label}}</label>
    {{/if}}
    <input
        {{#if className}}
            class={{className}}
        {{/if}}
        name={{name}}
        type={{type}}
         {{#if placeholder}}
            placeholder={{placeholder}}
        {{/if}}
        {{attr}}
    >
`
