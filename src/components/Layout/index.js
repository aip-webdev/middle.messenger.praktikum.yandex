import styles from './Layout.module.scss'
export const layout = (children) => `<main id="main" class=${styles.layout}>${children || ''}</main>`
