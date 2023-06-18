import './styles/style.module.scss'
import {layout} from "./components/Layout/index.js";
import {getPage} from "./routing/index.js";
import Handlebars from "handlebars";

export const App = () =>  Handlebars.compile(layout(getPage()))()
