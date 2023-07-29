import './styles/style.module.scss'
import { Layout } from './components/Layout'
import AppRouter from './routing'
import { storeLogging } from './store/storeLogging.ts'
import AuthActions from './actions/AuthActions.ts'

export const App = () => {
    AuthActions.login(false)
    AppRouter()
    storeLogging()
    return Layout()
}
