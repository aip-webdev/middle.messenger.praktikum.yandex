import { waitElement } from './waitElement.ts'
import { IBlock } from '../../core/Block.ts'

export const render = (queryId: string, block: IBlock) => {
    waitElement(queryId).then(root => {
        root.innerHTML = ''
        root.appendChild(block.getContent() as Node)
        block.dispatchComponentDidMount()
    })
}
