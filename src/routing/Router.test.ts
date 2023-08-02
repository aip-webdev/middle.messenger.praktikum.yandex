import { expect, use } from 'chai'
import Router, { IRouter } from './Router.ts'
import sinonChai from 'sinon-chai'
import Block, { IBlock } from '../core/Block.ts'
import Store from '../store'
import { createSandbox } from 'sinon'
import { NotFoundPage } from '../pages/NotFoundPage'

describe('Router', () => {
    use(sinonChai)
    const sinon = createSandbox()
    let router: IRouter
    const rootId = 'app'
    let pathname: string
    let block: IBlock
    beforeEach(() => {
        router = Router
        pathname = '/test'
        block = Block('<div>Блок</div>')

        router.use(pathname, block, rootId)
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should create new instance of Router', () => {
        const instance = Router
        expect(instance).to.exist
    })

    describe('.use', () => {
        it('should add a new route to the routes array', () => {
            expect(router.getRoute(pathname)).to.exist
        })
    })

    describe('.start', () => {
        it('should handle onpopstate event', () => {
            const handler = sinon.spy()
            sinon.stub(Store, 'subscribe')
            sinon.stub(window, 'onpopstate').value(handler)
            router.start()
            expect(handler).to.exist
        })

        it('should handle onhashchange event', () => {
            const handler = sinon.spy()
            sinon.stub(Store, 'subscribe')
            sinon.stub(window, 'onhashchange').value(handler)
            router.start()
            expect(handler).to.exist
        })
    })

    describe('.go', () => {
        it('should push the given pathname to history', () => {
            sinon.stub(window.history, 'pushState')
            router.go(pathname)
            expect(window.history.pushState).to.have.been.calledWithMatch({ page: pathname }, '', pathname)
        })
    })

    describe('.back', () => {
        it('should go back in history', () => {
            router.start()
            sinon.stub(window.history, 'go')
            router.back()
            expect(window.history.go).to.have.been.calledWith(-1)
        })
    })

    describe('.forward', () => {
        it('should go forward in history', () => {
            router.start()
            sinon.stub(window.history, 'go')
            router.forward()
            expect(window.history.go).to.have.been.calledWith(1)
        })
    })

    describe('.getRoute', () => {
        it('should return the route with the given pathname', () => {
            const route = router.getRoute(pathname)
            expect(route).to.exist
            expect(route?.pathname).to.equal(pathname)
        })

        it('should return null if no route matches the given pathname', () => {
            const pathname = '/unknown_route'
            const route = router.getRoute(pathname)
            expect(route?.block?.getContent()?.innerHTML).to.equal(NotFoundPage().getContent()?.innerHTML)
        })
    })

    describe('.getCurrentRoute', () => {
        it('should return the current route', () => {
            router.start()
            router.go(pathname)

            const currentRoute = router.getCurrentRoute()

            expect(currentRoute).to.exist
            expect(currentRoute.pathname).to.equal(pathname)
        })

        it('should return the route with the current window location', () => {
            router.start()
            router.go(pathname)
            sinon.stub(Router, 'getRoute').value(pathname)

            const currentRoute = router.getCurrentRoute()

            expect(currentRoute).to.exist
            expect(currentRoute.pathname).to.equal(pathname)
        })
    })
})
