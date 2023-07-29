import { listTemplate } from './list.tmpl.js'
import Block from '../../core/Block.ts'

interface IListProps {
  listStyle: string;
  itemStyle?: string;
  items: unknown[];
  id?: string;
}

export const List = ({ listStyle, itemStyle, items, id }: IListProps) => {
    return Block(listTemplate, {
        listClassName: listStyle,
        itemClassName: itemStyle,
        items: items,
        id: id
    })
}
