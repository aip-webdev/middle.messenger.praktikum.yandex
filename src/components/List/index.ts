import Block from '../../core/Block.ts'
import { listTemplate } from './list.tmpl.ts'

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
