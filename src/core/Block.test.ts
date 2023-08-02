import { assert } from 'chai'
import Block from './Block.ts'
import { waitElement } from '../utils/elements/waitElement.ts'

describe('Block', () => {
    it('should render correctly', () => {
        const props = { foo: 'bar' }
        const template = '<div>{{foo}}</div>'
        const block = Block(template, props)
        assert.deepEqual((block).getContent()?.outerHTML, '<div>bar</div>')
    })

    it('should set props correctly', () => {
        const props = { foo: 'bar', baz: 'qux' }
        const template = '<div>{{foo}} {{baz}}</div>'
        const block = Block(template, props)
        assert.deepEqual((block).getContent()?.outerHTML, '<div>bar qux</div>')
        block.setProps({ foo: 'bard', baz: 'quiz' })
        assert.deepEqual((block).getContent()?.outerHTML, '<div>bard quiz</div>')
    })

    it('should add event listeners for actions', () => {
        const events = {
            click: (e: Event) => {
                (e.target as HTMLElement).innerText = 'clicked'
            }
        }
        const block = Block('<div id={{id}}>not clicked</div>', { id: 'clickDiv', events })
        block.getContent()?.click()
        waitElement('clickDiv').then(div =>
            assert.deepEqual(div.innerText, 'clicked')
        )
    })
})
