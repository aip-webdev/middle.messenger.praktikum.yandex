import { template } from './form.tmpl.ts'
import Block from '../../core/Block.ts'

interface IFormProps {
  children: unknown;
  style: string;
  actions?: object;
  id?: string;
}

export function Form({
    children, style, actions, id
}: IFormProps) {
    return Block(template, {
        id: id,
        style: style,
        children: children,
        events: { ...actions }
    })
}
