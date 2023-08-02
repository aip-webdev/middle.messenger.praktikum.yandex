import { IRoute, Route } from './Route.ts'
import { assert } from 'chai'
import Block, { IBlock } from '../core/Block.ts'
import { waitElement } from '../utils/elements/waitElement.ts'

describe('Route', () => {
    let route: IRoute
    let block: IBlock
    let rootQuery
    let pathname: string
    beforeEach(() => {
        block = Block('<div>Блок</div>')
        rootQuery = 'app'
        pathname = '/route-1'
        route = Route(pathname, block, rootQuery)
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
        assert.exists(block.getContent()?.innerHTML)
        waitElement('app').then(app => {
            assert.isTrue(app.innerHTML.includes(block.getContent()!.innerHTML))
        })
    })
})
