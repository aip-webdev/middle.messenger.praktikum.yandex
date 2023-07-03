export const listTemplate =
  `<ul class={{{listClassName}}}>
        {{#each items}}
            <li class={{@root.itemClassName}}>{{{this}}}</li>
        {{/each}}
    </ul>`
