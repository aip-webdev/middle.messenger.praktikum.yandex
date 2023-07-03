import { UserInfo } from '../components/UserInfo'
import { ProfilePage } from '../pages/ProfilePage'
import { isEmpty } from '../utils/validation/isEmpty.js'
import { waitElement } from '../utils/elements/waitElement.js'
import { IUserInfo } from '../components/UserInfo/types'
import { NotFoundPage } from '../pages/NotFoundPage'

interface ProfileRouterParams {
  path: string;
  userinfo: IUserInfo;
}

export const profileRouter = ({ path, userinfo }: ProfileRouterParams) => {
    // path=/profile
    if (isEmpty(path)) {
        waitElement('main').then((mainEl: HTMLElement) => {
            // при переходе со страницы чатов меняем все дочерние элементы main
            // при переходе со страниц изменения данных пользователя или смены пароля обновляем только содержимое profile-content
            if (isEmpty(mainEl.innerHTML) || !mainEl.innerHTML.includes('profile-content')) {
                mainEl.innerHTML = ''
                mainEl.appendChild(ProfilePage(
                    UserInfo({ userinfo: userinfo, edit: false, editPass: false })
                ).getContent() as Node)

            } else {
                waitElement('profile-content').then((el) => {
                    el.innerHTML = ''
                    el.appendChild(UserInfo({
                        userinfo: userinfo,
                        edit: false,
                        editPass: false
                    }).getContent() as Node)
                })
            }
        })
        return null
    } // path=/profile/changePassword,path=/profile/edit
    let result = null
    waitElement('main').then((mainEl) => {
    // при переходе со страницы чатов меняем все дочерние элементы main
        if (isEmpty(mainEl.innerHTML) || !mainEl.innerHTML.toString().includes('profile-content')) {
            mainEl.innerHTML = ''
            mainEl.appendChild(ProfilePage().getContent() as Node)
        }
        // после обновляем содержимое profile-content
        waitElement('profile-content').then((el) => {
            switch (path) {
            case 'edit':
                el.innerHTML = ''
                return (el.appendChild(UserInfo({
                    userinfo: userinfo,
                    edit: true,
                    editPass: false
                }).getContent() as Node))
            case 'password':
                el.innerHTML = ''
                return (el.appendChild(UserInfo({
                    userinfo: userinfo,
                    edit: false,
                    editPass: true
                }).getContent() as Node))
            default:
                result = NotFoundPage()
            }
        })
    })
    return result
}
