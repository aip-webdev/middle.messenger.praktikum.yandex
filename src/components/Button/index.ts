import { template } from './button.tmpl.ts'
import Block from '../../core/Block.ts'

interface IButtonProps {
  children?: unknown;
  onClick?: (e: Event) => void;
  style?: string;
  type?: string;
}

export function Button({
    children = '',
    onClick = () => {
    },
    style,
    type = 'button'
}: IButtonProps) {
    return Block(template, {
        children: children,
        style: style,
        events: {
            click: onClick
        },
        type: type
    })
}

/*
* {
    const id = generateRandomString()
    clickEvent(id, onClick).then()
    return Handlebars.compile(template)({
        id: id,
        children: children,
        style: style
    })
}*/
