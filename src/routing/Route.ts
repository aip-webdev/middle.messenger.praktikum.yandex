import { render } from '../utils/elements/render.ts'
import isEqual from '../utils/common/isEqual.ts'
import { IBlock } from '../core/Block.ts'

export interface IRoute {
  pathname: string,
  block: IBlock | null,
  match: (path: string) => boolean
  navigate: (path: string) => void
  render: () => void
  leave: () => void
}

export function Route(pathname: string, block: IBlock, rootQuery = 'main'): IRoute {
    const match = (path: string) => isEqual(path, pathname)
    const navigate = (path: string) => {
        if (match(path)) {
            block.render()
        }
        block.show()
    }
    const leave = () => {
        block.hide()
    }

    const rendering = () => {
        render(rootQuery, block)
    }
    return Object.freeze({
        pathname,
        block,
        match,
        navigate,
        leave,
        render: rendering
    })
}
