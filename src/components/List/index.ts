import { listTemplate } from './list.tmpl.js'
import Block from '../../utils/elements/Block.ts'

interface IListProps {
  listStyle: string;
  itemStyle: string;
  items: unknown[];
}

export const List = ({ listStyle, itemStyle, items }: IListProps) =>
    Block(listTemplate, {
        listClassName: listStyle,
        itemClassName: itemStyle,
        items: items
    })
