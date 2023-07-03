import { isEmpty } from '../utils/validation/isEmpty.ts'
import { NotFoundPage } from '../pages/NotFoundPage'
import { IRoute, routes } from './routes.ts'
import { chatRouter } from './chatRouter.js'
import { mockChatList } from '../pages/ChatPage/mockChatList.ts'
import { mockUserInfo } from '../components/UserInfo/mockUserInfo.ts'
import { profileRouter } from './profileRouter.ts'
import { waitElement } from '../utils/elements/waitElement.ts'
import { RegistrationPage } from '../pages/RegistrationPage'
import { LoginPage } from '../pages/LoginPage'
import { BlockFactory } from '../utils/elements/Block.ts'

export const getPage = (): null | BlockFactory => {
    const paths = window.location.pathname.toString().slice(1).split('/')
    const chatList = mockChatList
    const userInfo = mockUserInfo
    switch (paths[0]) {
    case '':
    case '/':
    case 'login':
        waitElement('main').then(mainEl => {
            mainEl.innerHTML = ''
            mainEl.appendChild(LoginPage().getContent() as Node)
        })
        return null
    case 'registration':
        waitElement('main').then(mainEl => {
            mainEl.innerHTML = ''
            mainEl.appendChild(RegistrationPage().getContent() as Node)
        }
        )
        return null
    case 'chats':
        return paths.length === 2
            ? chatRouter({ id: paths[1], chatList })
            : chatRouter({ id: '', chatList })
    case 'profile':
        return paths.length === 2
            ? profileRouter({ path: paths[1], userinfo: userInfo })
            : profileRouter({ path: '', userinfo: userInfo })
    }
    const route = ('/' + paths[0]) as keyof IRoute
    return routes[route] || NotFoundPage()
}

const handleRoute = (e?: Event) => {
    e ? e.preventDefault() : {}
    const page = getPage()
    if (!isEmpty(page)) {
        waitElement('main').then(el => {
            el.innerHTML = ''
            el.appendChild(page?.getContent() as Node)
        })
    }
}

window.onpopstate = handleRoute

export const pushHistory = (route: string) => {
    const state = { page: route }
    history.pushState(state, '', state.page)
    handleRoute()
}

window.addEventListener('popstate', handleRoute)
window.addEventListener('hashchange', handleRoute)
window.addEventListener('load', handleRoute)
