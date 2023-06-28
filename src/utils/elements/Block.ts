import EventBus, { EventBusCallback } from '../events/EventBus.ts'
import { makePropsProxy } from './makePropsProxy.ts'
import { v4 as makeUUID } from 'uuid'
import Handlebars from 'handlebars'

type BlockChildren = {
  [key: string]: BlockFactory | BlockFactory[];
};

type BlockEvents = {
  INIT: string;
  FLOW_CDM: string;
  FLOW_CDU: string;
  FLOW_RENDER: string;
};

type BlockMeta = {
  template: string;
  props: CommonObject;
};
type Events = { [key: string]: (e: Event) => void }

export interface BlockFactory {
  id: string,
  setProps: (props: CommonObject) => void;
  getContent: () => HTMLElement | null;
  show: () => void;
  hide: () => void;
  dispatchComponentDidMount: (callback?: () => void) => void;
}

const NOOP = () => {
}

export default function Block(
    template: string,
    propsAndChildren: { [key: string]: (unknown | BlockFactory | BlockFactory[]) } = {}
): BlockFactory {
    const eventBus = EventBus()
    const { children, props } = getChildren(propsAndChildren)
    const meta: BlockMeta = {
        template,
        props
    }
    const id = makeUUID()
    const proxyProps = makePropsProxy<CommonObject>({ ...props, __id: id })
    let events: Events
    let element: HTMLElement | null = null

    const addEvents = () => {
        events = proxyProps.events as Events
        if (!events) return
        Object.keys(events).forEach((eventName) => {
            (element as HTMLElement)?.addEventListener(eventName, events[eventName] as EventBusCallback)
        })
    }

    const removeEvents = () => {
        if (!events) return
        Object.keys(events).forEach((eventName) => {
            (element as HTMLElement)?.removeEventListener(eventName, events[eventName])
        })
        events = {}
    }

    const compile = () => {
        const propsAndStubs = { ...proxyProps }
        Object.entries(children).forEach(([key, child]) => {
            if ('id' in child) {
                propsAndStubs[key] = `<div data-id="${child.id}"></div>`
            } else if (child[0]?.id) {
                let items: string[] = []
                child.forEach(value => items = [...items, `<div data-id="${value.id}"></div>`])
                propsAndStubs[key] = items
            }
        })
        const fragment = createDocumentElement('template') as HTMLTemplateElement
        fragment.innerHTML = Handlebars.compile(meta.template)(propsAndStubs)
        const replaceStub = (child: BlockFactory) => {
            const stub = fragment.content.querySelector(`[data-id="${child.id}"]`)
            if (!stub) return
            if ('getContent' in child) {
                stub?.replaceWith(child.getContent() as Node)
            }
        }
        Object.values(children).forEach(child => {
            if ('id' in child) {
                replaceStub(child)
            } else if (child[0]?.id) {
                child.forEach(value => replaceStub(value))
            }

        })

        const content = fragment.content

        element = (content.children.length === 1 ? content.children[0] : content) as HTMLElement

    }
    const createDocumentElement = (tagName: string): HTMLElement => document.createElement(tagName)

    const registerEvents = () => {
        eventBus.on(EVENTS.INIT, init)
        eventBus.on(EVENTS.FLOW_CDM, componentDidMount as EventBusCallback)
        eventBus.on(EVENTS.FLOW_CDU, componentDidUpdate as EventBusCallback)
        eventBus.on(EVENTS.FLOW_RENDER, render)
    }

    const init = () => {
        eventBus.emit(EVENTS.FLOW_RENDER)
    }

    const componentDidMount = (callback: () => void = NOOP) => {
        if (callback) {
            callback()
        }
        Object.values(children).forEach((child) => {
            if ('id' in child) {
                child.dispatchComponentDidMount()
            } else {
                child.forEach(value => value.dispatchComponentDidMount())
            }
        })
    }

    const dispatchComponentDidMount = (callback: () => void = NOOP) => {
        if (typeof callback === 'function') {
            eventBus.on(EVENTS.FLOW_CDM, callback)
        }
    }

    const componentDidUpdate = (oldProps: CommonObject, newProps: CommonObject) => {
        if (oldProps !== newProps) {
            Object.keys(newProps).forEach((propKey) => {
                proxyProps[propKey] = newProps[propKey]
            })
            eventBus.emit(EVENTS.FLOW_RENDER)
        }
    }

    const render = () => {
        removeEvents()
        compile()
        addEvents()
        getContent()
    }

    const getContent = () => element

    const show = () => {
        element ? (element as HTMLElement).style.display = 'block' : null
    }

    const hide = () => {
        element ? (element as HTMLElement).style.display = 'none' : null
    }

    const setProps = (nextProps: CommonObject) => {
        if (nextProps) {
            eventBus.emit(EVENTS.FLOW_CDU, proxyProps, nextProps)
        }
    }

    const block: Readonly<{
    hide: () => void;
    setProps: (nextProps: CommonObject) => void;
    getContent: () => HTMLElement | null;
    dispatchComponentDidMount: (callback?: () => void) => void;
    show: () => void;
    id: string
  }> = Object.freeze({
      id,
      setProps,
      show,
      hide,
      getContent,
      dispatchComponentDidMount
  })

    registerEvents()
    eventBus.emit(EVENTS.INIT)

    return <BlockFactory>block
}

const EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
} as BlockEvents


const getChildren = (
    propsAndChildren: { [key: string]: (unknown | BlockFactory | BlockFactory[]) }
): { children: BlockChildren; props: CommonObject } => {
    const children: BlockChildren = {}
    const props: CommonObject = {}
    Object.entries(propsAndChildren).forEach(([key, value]) => {
        if (key === 'items' && (value as BlockFactory[])[0]?.id) {
            children['items'] = value as BlockFactory[]
        }
        if ((value as BlockFactory)?.id) {
            children[key] = value as BlockFactory
        } else {
            props[key] = value
        }
    })
    return { children, props }
}
