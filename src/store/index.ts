import EventBus from '../core/EventBus.ts'
import set from '../utils/common/set.ts'
import { StoreEvents } from './storeEvents.ts'
import merge from '../utils/common/merge.ts'
import isEqual from '../utils/common/isEqual.ts'

export interface IStateError {
  code: number | null;
  reason: string;
}

export interface IState {
  auth: boolean | null;
  error: IStateError;
  user: IUserData | null;
  chats: IChatsState;
}

interface IStore {
  getState(): IState,

  set(path: string, value: unknown, ...storeEvents: StoreEvents[keyof StoreEvents][]): void

  merge(value: Indexed, ...storeEvents: StoreEvents[keyof StoreEvents][]): void

  subscribe(callback: () => void, ...storeEvents: StoreEvents[keyof StoreEvents][]): void
}

const NOOP = () => {
}

function Store() {
    const state: IState = {
        error: {
            code: null,
            reason: ''
        },
        auth: null,
        user: null,
        chats: {
            loading: false,
            list: []
        }
    }
    const eventBus = EventBus()
    let instance: IStore | undefined

    function Store(): void {
        if (!instance) instance = this as IStore
    }

    Store.prototype.set = (path: keyof IState, value: unknown, ...storeEvents: StoreEvents[keyof StoreEvents][]) => {
        if (!isEqual(state[path], value)) {
            set(state, path, value)
            storeEvents.forEach(event => eventBus.emit(event))
        }
    }

    Store.prototype.merge = (value: Indexed, ...storeEvents: StoreEvents[keyof StoreEvents][]) => {
        if (!isEqual(state, value)) {
            merge(state as unknown as Indexed, value)
            storeEvents.forEach(event => eventBus.emit(event))
        }
    }

    Store.prototype.getState = () => state

    Store.prototype.subscribe = (callback: () => void = NOOP, ...storeEvents: StoreEvents[keyof StoreEvents][]) =>
        storeEvents.forEach(event => eventBus.on(event, callback))

    const getInstance = (): IStore => instance ? instance : new (Store as any)() as IStore

    return getInstance()
}

export default Store()
