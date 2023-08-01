import { IRoute, Route } from './Route.ts'
import sinonChai from 'sinon-chai'
import { assert, use } from 'chai'
import sinon, { createSandbox } from 'sinon'
import Block, { IBlock } from '../core/Block.ts'

describe('Route', () => {
    use(sinonChai)
    const sandbox = createSandbox()
    let route: IRoute
    let block: IBlock
    let rootQuery
    let pathname: string
    let render: ReturnType<typeof sandbox.spy>
    beforeEach(() => {
        block = Block('<div>Первый блок</div>')
        rootQuery = 'main'
        pathname = '/route-1'
        route = Route(pathname, block, rootQuery)
        render = sandbox.spy(route, 'render')
    })

    afterEach(() => {
        sinon.reset()
    })

    it('should have the correct pathname', () => {
        assert.equal(route.pathname, pathname)
    })

    it('should have the correct block', () => {
        assert.equal(route.block, block)
    })

    it('should match the path correctly', () => {
        assert.isTrue(route.match(pathname))
        assert.isFalse(route.match('/other-path'))
    })


    it('should render correctly', () => {
        route.render()
        assert.isTrue(render.calledOnce)
    })
})
