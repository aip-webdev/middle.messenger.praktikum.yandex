import Block from '../../core/Block.ts'
import merge from '../../utils/common/merge.ts'
import { eventPhoneHandler } from '../../utils/validation/dataPhonePattern.ts'

export interface IInputProps {
  style?: string;
  labelStyle?: string;
  name?: string;
  type?: string;
  label?: unknown;
  attr?: string;
  placeholder?: string;
  id?: string;
  accept?: string;
  actions?: Indexed;
}

const preventKeyEvent = (e: KeyboardEvent) => {
    if (e.key === 'Enter') e.preventDefault()
}

export const Input = ({
    style = '',
    labelStyle = '',
    name,
    type = 'text',
    label = '',
    attr = '',
    placeholder,
    id,
    accept,
    actions = {}
}: IInputProps) =>
    Block(`
      {{#if label}}
        <label
        {{#if style}}
          class={{style}}
        {{/if}}
        for={{name}}>{{{label}}}
        </label>
      {{/if}}
      {{{input}}}
`, {
        name: name,
        label: label,
        style: labelStyle,
        input: Block(`<input
        {{#if id}}
            id={{id}}
        {{/if}}
        {{#if style}}
            class={{style}}
        {{/if}}
        name={{name}}
        type={{type}}
        {{#if placeholder}}
            placeholder={{placeholder}}
        {{/if}}
        {{#if accept}}
            accept={{accept}}
        {{/if}}
        {{attr}}
        autocomplete=on
    >`,
        {
            style: style,
            name: name,
            type: type,
            attr: attr,
            id: id,
            accept: accept,
            placeholder: placeholder,
            events: attr === 'data-phone' ? {
                ...merge(actions, {
                    input: (event: Event) => eventPhoneHandler(event),
                    blur: (event: Event) => eventPhoneHandler(event),
                    focus: (event: Event) => eventPhoneHandler(event),
                    click: (event: Event) => eventPhoneHandler(event),
                    keydown: preventKeyEvent,
                    keypress: preventKeyEvent
                })
            } : {
                ...actions,
                keydown: preventKeyEvent,
                keypress: preventKeyEvent
            }
        })
    })
