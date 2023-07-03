import { Form } from '../Form'
import { Input } from '../Input'
import styles from './Search.module.scss'

export const Search = () => {
    return Form({
        children: Input({
            style: styles.input,
            name: 'search',
            type: 'text',
            label: '',
            attr: 'data-search',
            placeholder: 'Поиск'
        }),
        style: styles.search
    })
}
