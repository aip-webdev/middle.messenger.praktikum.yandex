import { template } from './layout.tmpl.ts'
import Block, { BlockFactory } from '../../utils/elements/Block.ts'
import { isEmpty } from '../../utils/validation/isEmpty.ts'

interface ILayoutProps {
  children: BlockFactory | null;
}

export const Layout = ({ children }: ILayoutProps) =>
    Block(template, { children: !isEmpty(children) ? children : '' })
