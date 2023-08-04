import { StoreEvents } from './storeEvents.ts'
import Store, { IState } from './index.ts'
import isEqual from '../utils/common/isEqual.ts'
import { IBlock } from '../core/Block.ts'

export function connect(block: IBlock, mapStateToProps: (state: IState) => Indexed, ...events: StoreEvents[keyof StoreEvents][]) {
    let state = mapStateToProps(Store.getState())
    Store.subscribe(() => {
        const newState = mapStateToProps(Store.getState())
        if (!isEqual(state, newState)) {
            state = newState
            block.setProps({ ...state })
        }
    }, ...events)
    return block
}

