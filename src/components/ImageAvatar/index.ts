import styles from './ImageAvatar.module.scss'
import { template } from './imageAvatar.tmpl.ts'
import Block from '../../core/Block.ts'
import { waitElement } from '../../utils/elements/waitElement.ts'
import { Input } from '../Input'
import UserActions from '../../actions/UserActions.ts'
import Store, { IState } from '../../store'
import { connect } from '../../store/connect.ts'
import { STORE_EVENTS } from '../../store/storeEvents.ts'
import { BASE_URI } from '../../core/HTTPClient.ts'
import { ModalForm } from '../ModalForm'

export const ImageAvatar = () => {
    const handleClick = () => {
        waitElement('modal').then(element => element.appendChild(
      ModalForm({
          title: 'Загрузите файл',
          btnText: 'Поменять',
          children: Block(`
                      {{{fileInput}}}
                      {{{input}}}
                  `, {
              fileInput: Input({
                  id: 'avatar',
                  label: Block(`
                  <span id="file-name"></span>
                  <span class={{style}}>Выберите файл</span>
                  `, {
                      style: styles.labelStyle
                  }),
                  style: styles.fileInputStyle,
                  type: 'file',
                  name: 'avatar',
                  accept: 'image/*',
                  actions: {
                      change: (e: InputEvent) => waitElement('file-name').then(element => {
                          const fileInput = e.target as HTMLInputElement
                          element.innerText = fileInput?.files ? fileInput.files[0].name : ''
                      })
                  }
              }),
              input: Input({ type: 'submit' })
          }),
          onSubmitForm: (e: Event) => {
              e.preventDefault()
              e.stopPropagation()
              UserActions.changeAvatar(e.target as EventTarget).then(() => {
                  element.innerHTML = ''
              })
          },
          formId: 'avatar-form'
      }).getContent() as HTMLElement
        ))
    }

    const mapStateToProps = (state: IState) => {
        const link = state.user?.avatar
        return {
            style: styles.avatarBlock,
            imageStyle: styles.image,
            link: link ? BASE_URI + '/resources' + link : null,
            events: {
                click: handleClick
            }
        }
    }

    return connect(
        Block(template, mapStateToProps(Store.getState())),
        mapStateToProps,
        STORE_EVENTS.GET_USER_DATA_SUCCESS, STORE_EVENTS.USER_AVATAR_CHANGED_SUCCESS
    )
}
