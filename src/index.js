import './styles/style.module.scss'
import {layout} from "./components/Layout/index.js";
import {index} from "./routing/index.js";

export const App = () =>  layout(index())
