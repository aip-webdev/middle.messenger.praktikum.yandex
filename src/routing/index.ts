import { RegistrationPage } from '../pages/RegistrationPage'
import { LoginPage } from '../pages/LoginPage'
import Router from './Router.ts'
import { ProfilePage } from '../pages/ProfilePage'
import { UserInfo } from '../components/UserInfo'
import { ChatPage } from '../pages/ChatPage'
import Store from '../store'
import { STORE_EVENTS } from '../store/storeEvents.ts'
import AuthActions from '../actions/AuthActions.ts'
import ChatActions from '../actions/ChatActions.ts'
import { EmptyContent } from '../pages/ChatPage/EmptyContent'

export interface IRoutes {
  SIGNUP: string;
  ERROR: string;
  CHAT: (id: number) => string;
  MESSENGER: string;
  LOGIN: string;
  SETTINGS: string;
  SETTINGS_EDIT: string;
  SETTINGS_PASSWORD: string;
  START: string;
  START_SLASH: string;
}

export const ROUTES = {
    ERROR: '/error',
    CHAT: (id: number) => `/messenger/${id}`,
    MESSENGER: '/messenger',
    LOGIN: '/login',
    SETTINGS: '/settings',
    SETTINGS_EDIT: '/settings/edit',
    SETTINGS_PASSWORD: '/settings/password',
    SIGNUP: '/sign-up',
    START: '',
    START_SLASH: '/'

} as IRoutes

export default function AppRouter() {
    Router
        .use(ROUTES.START, LoginPage())
        .use(ROUTES.START_SLASH, LoginPage())
        .use(ROUTES.LOGIN, LoginPage())
        .use(ROUTES.SIGNUP, RegistrationPage())
        .use(ROUTES.MESSENGER, ChatPage({ content: EmptyContent() }))
        .use(
            ROUTES.SETTINGS,
            ProfilePage(UserInfo({ edit: false, editPass: false }))
        )
        .use(
            ROUTES.SETTINGS_EDIT,
            ProfilePage(UserInfo({ edit: true, editPass: false }))
        )
        .use(
            ROUTES.SETTINGS_PASSWORD,
            ProfilePage(UserInfo({ edit: false, editPass: true }))
        )

    Store.subscribe(() => Router.start(), STORE_EVENTS.INIT)


    Store.subscribe(() => {
        Router.go(window.location.pathname)
        AuthActions.updateUserInfo()
        ChatActions.getChats()
    }, STORE_EVENTS.LOGIN_USER_SUCCESS)
    Store.subscribe(() => Router.go(ROUTES.LOGIN), STORE_EVENTS.LOGOUT_USER_SUCCESS)
    Store.subscribe(() => Router.go(ROUTES.SETTINGS), STORE_EVENTS.USER_UPDATED_SUCCESS)
    Store.subscribe(() => Router.go(ROUTES.SETTINGS), STORE_EVENTS.PASSWORD_CHANGE_SUCCESS)
}
