import { STORE_EVENTS } from './storeEvents.ts'
import Store from './index.ts'
import { errorPopup } from '../components/ErrorPopup'

export const storeLogging = () => Object.values(STORE_EVENTS).forEach(event => Store.subscribe(() => {
    console.info({ [event]: Store.getState() })
    if (event.includes('_FAILURE')) {
        errorPopup(Store.getState().error.reason)
    }
}, event))
