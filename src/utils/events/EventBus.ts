export type EventBusCallback = (...args: (unknown | null)[]) => void;

export default function EventBus() {
    const listeners: {
    [eventName: string]: EventBusCallback[];
  } = {}

    function on(eventName: string, callback: EventBusCallback) {
        if (!listeners[eventName]) {
            listeners[eventName] = []
        }
        listeners[eventName].push(callback)
    }

    function off(eventName: string, callback: EventBusCallback) {
        const eventListeners = listeners[eventName]
        if (eventListeners) {
            listeners[eventName] = eventListeners.filter(cb => cb !== callback)
        }
    }

    function emit(eventName: string, ...args: unknown[]) {
        const eventListeners = listeners[eventName]
        if (eventListeners) {
            eventListeners.forEach(callback => callback(...args))
        }
    }

    return Object.freeze({
        on,
        off,
        emit
    })
}
