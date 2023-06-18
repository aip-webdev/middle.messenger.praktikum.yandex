import styles from './ImageAvatar.module.scss'
import {isEmpty} from "../../utils/validation/isEmpty.js";
import Handlebars from "handlebars";

export const ImageAvatar = (link) => Handlebars.compile(`
    <div class=${styles.avatarBlock}>
        ${!isEmpty(link) ? `<img alt="" class=${styles.image} src=${link}>` : ''}
    </div>
`)()
