import EventBus, { EventBusCallback } from './EventBus.ts'
import { makePropsProxy } from './makePropsProxy.ts'
import { v4 as makeUUID } from 'uuid'
import Handlebars from 'handlebars'
import styles from '../styles/style.module.scss'
import isEqual from '../utils/common/isEqual.ts'
import { keys } from '../utils/common/object.ts'

type BlockChildren = {
  [key: string]: IBlock | IBlock[];
};

type BlockEvents = {
  INIT: string;
  FLOW_CDM: string;
  FLOW_CDU: string;
  FLOW_RENDER: string;
};

type BlockMeta = {
  template: string;
  props: Indexed;
};
type Events = { [key: string]: (e: Event) => void }

export interface IBlock {
  id: string,
  setProps: (props: Indexed) => void;
  getContent: () => HTMLElement | null;
  render: () => IBlock;
  show: () => void;
  hide: () => void;
  dispatchComponentDidMount: (callback?: () => void) => void;
}

const NOOP = () => {
}

export default function Block(
    template: string,
    propsAndChildren: { [key: string]: (unknown | IBlock | IBlock[]) } = {}
): IBlock {
    const eventBus = EventBus()
    let { children, props } = splitPropsAndChildren(propsAndChildren)
    const meta: BlockMeta = {
        template,
        props
    }
    const id = makeUUID()
    const proxyProps = makePropsProxy<Indexed>({ ...props, __id: id })
    let events: Events
    let element: HTMLElement | null = null
    let elementClassName: string | null = null

    const addEvents = () => {
        events = proxyProps.events as Events
        if (!events) return
        keys(events).forEach((eventName) => {
            (element as HTMLElement)?.addEventListener(eventName, events[eventName] as EventBusCallback)
        })
    }

    const removeEvents = () => {
        if (!events) return
        keys(events).forEach((eventName) => {
            (element as HTMLElement)?.removeEventListener(eventName, events[eventName])
        })
        events = {}
    }

    const compile = async () => {
        const propsAndStubs = { ...proxyProps }
        Object.entries(children).forEach(([key, child]) => {
            if (Array.isArray(child) && child[0]?.id) {
                let items: string[] = []
                child.forEach(value => {
                    items = [...items, `<div class="${styles.hide}" data-id="${value.id}"></div>`]
                })
                propsAndStubs[key] = items
            } else if ('id' in child) {
                propsAndStubs[key] = `<div class="${styles.hide}" data-id="${child.id}"></div>`
            }
        })
        const fragment = createDocumentElement('template') as HTMLTemplateElement
        fragment.innerHTML = Handlebars.compile(meta.template)(propsAndStubs)
        const replaceStub = (child: IBlock) => {
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
        const newElement = (content.children.length === 1 ? content.children[0] : content) as HTMLElement

        if (!element) {
            element = newElement
            return
        }
        if (element?.parentNode) {
            element.parentNode.replaceChild(newElement, element)
            element.remove()
            element = newElement
        } else {
            element.innerHTML = newElement.innerHTML
        }

        // element.innerHTML = newElement.innerHTML
        elementClassName = element.className || null
    }
    const createDocumentElement = (tagName: string): HTMLElement => document.createElement(tagName)

    const registerEvents = () => {
        eventBus.on(EVENTS.FLOW_CDM, componentDidMount as EventBusCallback)
        eventBus.on(EVENTS.FLOW_CDU, componentDidUpdate as EventBusCallback)
        eventBus.on(EVENTS.FLOW_RENDER, render)
    }

    const componentDidMount = (callback: () => void = NOOP) => {
        if (callback) {
            callback()
        }
        Object.values(children).forEach((child) => {
            if ('id' in child) {
                child.dispatchComponentDidMount(callback)
            } else {
                child.forEach(value => value.dispatchComponentDidMount(callback))
            }
        })
    }

    const dispatchComponentDidMount = (callback: () => void = NOOP) => {
        if (typeof callback === 'function') {
            eventBus.on(EVENTS.FLOW_CDM, callback)
        }
    }

    const componentDidUpdate = (oldProps: Indexed, newProps: Indexed) => {
        const { children: newChildren, props: propsNew } = splitPropsAndChildren(newProps)

        // обновляем props если нужно
        if (!isEqual(oldProps, propsNew)) {
            keys(propsNew).forEach((propKey) => {
                proxyProps[propKey] = propsNew[propKey]

            })
            props = propsNew

            if (!isEqual(children, newChildren)) {
                children = newChildren
                Object.entries(newChildren).forEach(([key, child]) => {
                    if ('id' in child) {
                        children[key] = child

                    } else if (child[0]?.id && key === 'items') {
                        for (let i = 0; i < child.length; i++) {
                            if (!isEqual((children[key] as IBlock[])[i], child[i])) {
                                (children[key] as IBlock[])[i] = child[i]
                            }
                        }
                    }
                })
            }
            eventBus.emit(EVENTS.FLOW_RENDER)
        }
    }

    const render = () => {
        removeEvents()
        compile().then(() => {
            addEvents()
            show()
        })
        return block
    }

    const getContent = () => element

    const show = () => {
        if (element && elementClassName) {
            (element as HTMLElement).className = elementClassName
        }
    }

    const hide = () => {
        if (element) {
            (element as HTMLElement).className = styles.hide
        }
    }

    const setProps = (nextProps: Indexed) => {
        if (nextProps) eventBus.emit(EVENTS.FLOW_CDU, proxyProps, nextProps)
    }

    const block: Readonly<{
    hide: () => void;
    setProps: (nextProps: Indexed) => void;
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
      render,
      dispatchComponentDidMount
  })

    registerEvents()
    eventBus.emit(EVENTS.FLOW_RENDER)

    return <IBlock>block
}

const EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
} as BlockEvents


const splitPropsAndChildren = (
    propsAndChildren: { [key: string]: (unknown | IBlock | IBlock[]) }
): { children: BlockChildren; props: Indexed } => {
    const children: BlockChildren = {}
    const props: Indexed = {}
    Object.entries(propsAndChildren).forEach(([key, value]) => {
        if (Array.isArray(value) && (value as IBlock[])[0]?.id) {
            children[key] = value as IBlock[]
        } else if ((value as IBlock)?.id) {
            children[key] = value as IBlock
        } else {
            props[key] = value
        }
    })
    return { children, props }
}
