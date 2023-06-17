import {Form} from "../Form/index.js";
import {Input} from "../Input/index.js";
import styles from "./Search.module.scss";

export const Search = () => {
    return Form({
        children:Input(styles.input, 'search', 'text', null, 'data-search', 'Поиск'),
        style: styles.search
    })
}
