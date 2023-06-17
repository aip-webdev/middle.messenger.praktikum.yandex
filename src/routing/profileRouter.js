import {UserInfo} from "../components/UserInfo/index.js";
import {ProfilePage} from "../pages/ProfilePage/index.js";
import {isEmpty} from "../utils/validation/isEmpty.js";
import {waitElement} from "../utils/waitElement.js";

export const profileRouter = (path, userinfo) => {
    // path=/profile
    if (isEmpty(path)) {
        waitElement('main').then((mainEl) => {
            // при переходе со страницы чатов меняем все дочерние элементы main
            // при переходе со стриниц изменения данных пользователя или смены пароля обновляем только содержимое profile-content
            if (isEmpty(mainEl.innerHTML) || !mainEl.innerHTML.toString().includes('profile-content')) {
                mainEl.innerHTML = ProfilePage(UserInfo({userinfo: userinfo, edit: false, editPass: false}))
            } else {
                waitElement('profile-content').then((el) => {
                    el.innerHTML = UserInfo({userinfo: userinfo, edit: false, editPass: false})
                })
            }
        })
        return null
    } // path=/profile/changePassword,path=/profile/edit
    waitElement('main').then((mainEl) => {
        // при переходе со страницы чатов меняем все дочерние элементы main
        if (isEmpty(mainEl.innerHTML) || !mainEl.innerHTML.toString().includes('profile-content')) {
            mainEl.innerHTML = ProfilePage()
        }
        // после обновляем содержимое profile-content
        waitElement('profile-content').then((el) => {
            switch (path) {
                case 'edit':
                    return el.innerHTML = UserInfo({userinfo: userinfo, edit: true, editPass: false})
                case 'changePassword':
                    return el.innerHTML = UserInfo({userinfo: userinfo, edit: false, editPass: true})
            }
        })
    })
    return null
}
