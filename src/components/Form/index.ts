import { template } from './form.tmpl.js'
import Block from '../../utils/elements/Block.ts'

interface IFormProps {
  children: unknown;
  style: string;
  actions?: object;
}

export function Form({
    children, style, actions = {}
}: IFormProps) {
    return Block(template, {
        style: style,
        children: children,
        events: { ...actions }
    })
}
