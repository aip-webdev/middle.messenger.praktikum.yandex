import {isEmpty} from "../utils/validation/isEmpty.js";
import {NotFoundPage} from "../pages/NotFoundPage/index.js";
import {routes} from "./routes.js";
import {chatRouter} from "./chatRouter.js";
import {mockChatList} from "../pages/ChatPage/mockChatList.js";
import {mockUserInfo} from "../components/UserInfo/mockUserInfo.js";
import {profileRouter} from "./profileRouter.js";
import Handlebars from "handlebars";
import {waitElement} from "../utils/waitElement.js";
import {LoginPage} from "../pages/LoginPage/index.js";
import {RegistrationPage} from "../pages/RegistrationPage/index.js";

export const getPage = () => {
    let paths = window.location.pathname.toString().slice(1).split('/')
    let chatList = mockChatList()
    let userInfo = mockUserInfo
    switch (paths[0]) {
        case '':
        case '/':
        case 'signIn':
            waitElement('main').then((mainEl) => mainEl.innerHTML = LoginPage())
            return null
        case 'signUp':
            waitElement('main').then((mainEl) => mainEl.innerHTML = RegistrationPage())
            return null
        case 'chats':
            return paths.length === 2 ? chatRouter(paths[1], chatList) : chatRouter(null, chatList)
        case 'profile':
            return paths.length === 2 ? profileRouter(paths[1], userInfo) : profileRouter(null, userInfo)
    }
    return routes[`/${paths[0]}`] || NotFoundPage()
}

const handleRoute = (e) => {
    !!e ? e.preventDefault() : {}
    const main = document.querySelector('#main')
    const page = getPage()
    if (!isEmpty(page)) {
        main.innerHTML = Handlebars.compile(page)()
    }
}
window.onpopstate = history.onpushstate = handleRoute

export const pushHistory = (route) => {
    let state = {page: route};
    history.pushState(state, '', state.page);
    handleRoute()
}

window.addEventListener('popstate', handleRoute);
window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);
