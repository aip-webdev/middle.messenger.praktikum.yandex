import './styles/style.module.scss'
import { getPage } from './routing'
import { Layout } from './components/Layout'

export const App = () => Layout({ children: getPage() })
