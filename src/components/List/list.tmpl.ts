export const listTemplate =
  `<ul
    {{#if id}}
      id={{id}}
    {{/if}}
    class={{{listClassName}}}

  >
    {{#each items}}
        <li class={{@root.itemClassName}}>{{{this}}}</li>
    {{/each}}
  </ul>`
