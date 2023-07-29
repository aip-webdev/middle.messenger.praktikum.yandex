import { IBlock } from '../core/Block.ts'
import Route, { IRoute } from './Route.ts'
import { isEmpty } from '../utils/common/isEmpty.ts'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ROUTES } from './index.ts'
import Store from '../store'
import { STORE_EVENTS } from '../store/storeEvents.ts'

interface IRouter {
  use(pathname: string, block: IBlock, rootID?: string, rootBlock?: IBlock): IRouter;

  forward(): void;

  start(): IRouter;

  go(pathname: string): void;

  back(): void;

  getRoute(pathname: string): IRoute | null;

  getCurrentRoute(): IRoute;
}

function Router(): IRouter {
    const routes: IRoute[] = []
    let currentRoute: IRoute | null = null
    let instance: IRouter | undefined
    let rootId = 'main'

    function Router(): void {
        if (!instance) instance = this as IRouter
    }

    Router.prototype.use = function(pathname: string, block: IBlock, rootID: string = rootId) {
        if (routes.find(route => route.pathname === pathname)) return getInstance()
        rootId = !isEmpty(rootID) ? rootID : rootId
        routes.push(Route(pathname, block, rootId))
        return getInstance()
    }

    Router.prototype.start = function() {
        checkLoginAndRoute(window.location.pathname)
        const handler = () => checkLoginAndRoute(window.location.pathname)
        Store.subscribe(() => getInstance().go(ROUTES.LOGIN), STORE_EVENTS.LOGIN_USER_FAILURE)
        window.onpopstate = handler
        window.onhashchange = handler
    }

    const onRoute = async (pathName: string) => {
        const needRender = !(currentRoute && currentRoute?.pathname === pathName)
        currentRoute = needRender ? getInstance().getRoute(pathName) : currentRoute
        if (needRender) currentRoute?.render()
    }

    const checkLoginAndRoute = (pathName: string) => {
        if (pathName.includes('messenger/') && !routes.find(route => route.pathname === pathName)) {
            Store.subscribe(() => {
                if (window.location.pathname === pathName) getInstance().go(pathName)
            }, STORE_EVENTS.GET_CHATS_SUCCESS)
            return
        }
        if (pathName !== ROUTES.LOGIN && pathName !== ROUTES.SIGNUP &&
      Object.values(ROUTES).includes(pathName) && Store.getState().auth === false) {
            pushHistory(ROUTES.LOGIN)
            return onRoute(ROUTES.LOGIN)
        } else if (Array.of(ROUTES.LOGIN, ROUTES.START, ROUTES.START_SLASH, ROUTES.SIGNUP).includes(pathName) && Store.getState().auth) {
            pushHistory(ROUTES.MESSENGER)
            return onRoute(ROUTES.MESSENGER)
        }
        return onRoute(pathName)
    }

    const pushHistory = (pathName: string) => {
        const state = { page: pathName }
        history.pushState(state, '', state.page)
    }

    Router.prototype.go = function(pathname: string) {
        pushHistory(pathname)
        checkLoginAndRoute(pathname)
    }

    Router.prototype.back = function() {
        history.go(-1)
        checkLoginAndRoute(window.location.pathname)
    }

    Router.prototype.forward = function() {
        history.go(1)
        checkLoginAndRoute(window.location.pathname)
    }

    Router.prototype.getRoute = function(pathname: string) {
        return routes.find(route => route.match(pathname)) || Route(pathname, NotFoundPage())
    }

    Router.prototype.getCurrentRoute = function() {
        return currentRoute ? currentRoute : getInstance().getRoute(window.location.pathname)
    }

    function getInstance(): IRouter {
        if (!instance) return new (Router as any)() as IRouter
        return instance
    }

    return getInstance()
}

export default Router()
