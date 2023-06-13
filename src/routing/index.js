import {isEmpty} from "../utils/validation/isEmpty.js";
import {notFoundPage} from "../pages/NotFoundPage/index.js";
import {routes} from "./routes.js";
import {chatRouter} from "./chatRouter.js";
import {mockChatList} from "../pages/ChatPage/mockChatList.js";
import {mockUserInfo} from "../components/UserInfo/mockUserInfo.js";
import {profileRouter} from "./profileRouter.js";


export const index = () => {
    let paths = window.location.pathname.toString().slice(1).split('/')
    let chatList = mockChatList()
    let page
    console.log(paths)
    switch(paths[0]) {
        case 'chats':
            page =  paths.length === 2 ? chatRouter(paths[1], chatList) : chatRouter(null, chatList)
            break;
        case 'profile':
            page = paths.length === 2 ? profileRouter(paths[1], mockUserInfo) : profileRouter(null, mockUserInfo)
            break;
    }
    return page || routes[`/${paths[0]}`] || notFoundPage()
}

const handleRoute = (e) => {
    const main = document.querySelector('#main')
    !!e ? e.stopPropagation() : {}
    const page = index()
    if (!isEmpty(page)) {
        main.innerHTML = index()
    }
}
window.onpopstate = history.onpushstate = handleRoute

export const pushHistory = (route) => {
    history.pushState({}, null, `${window.location.origin}${route}`)
    handleRoute()
}

window.addEventListener('popstate', handleRoute);
