import { STORE_EVENTS, StoreEvents } from '../../store/storeEvents.ts'
import Store from '../../store'

interface IFailureRequest {
  status: number,
  reason: string
}

function checkFailurePromise(f: (...args: (unknown)[]) => Promise<unknown>, storeEvent: StoreEvents[keyof StoreEvents]) {
    return function() {
        return f.apply(this, arguments)
            .catch(({ status, reason }: IFailureRequest) => {
                if (status === 400 && reason === 'User already in system') {
                    Store.merge({
                        auth: true,
                        error: { code: null, reason: '' }
                    }, STORE_EVENTS.INIT, STORE_EVENTS.LOGIN_USER_SUCCESS)
                } else if (status === 401 && reason === 'Login or password is incorrect') {
                    Store.merge({ error: { code: status, reason }, auth: false }, storeEvent)
                } else if (status !== 200) {
                    Store.merge({ error: { code: status, reason } }, storeEvent)
                }
            })
    }
}

export default checkFailurePromise
