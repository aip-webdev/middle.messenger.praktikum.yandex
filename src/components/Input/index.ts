import Block from '../../utils/elements/Block.ts'

export interface IInputProps {
  style?: string;
  name: string;
  type: string;
  label: string;
  attr?: string;
  placeholder: string;
  actions?: object;
}

export const Input = ({
    style = '',
    name,
    type = 'text',
    label = '',
    attr = '',
    placeholder = '',
    actions = {}
}: IInputProps) =>
    Block(`
      {{#if label}}
        <label for={{name}}>{{label}}</label>
      {{/if}}
      {{{input}}}
`, {
        name: name,
        label: label,
        input: Block(`<input
        {{#if className}}
            class={{className}}
        {{/if}}
        name={{name}}
        type={{type}}
         {{#if placeholder}}
            placeholder={{placeholder}}
        {{/if}}
        {{attr}}
    >`,
        {
            className: style,
            name: name,
            type: type,
            attr: attr,
            placeholder: placeholder,
            events: {
                ...actions
            }
        })
    })
