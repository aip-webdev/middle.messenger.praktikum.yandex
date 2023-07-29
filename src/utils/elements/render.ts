import { IBlock } from '../../core/Block.ts'
import { waitElement } from './waitElement.ts'

export const render = (queryId: string, block: IBlock) => {
    waitElement(queryId).then(root => {
        root.innerHTML = ''
        root.appendChild(block.getContent() as Node)
        block.dispatchComponentDidMount()
    })
}
