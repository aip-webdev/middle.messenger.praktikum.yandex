export const mainLoaded = (handler) =>
    document.querySelector('#main') ?
        handler() :
        setTimeout(() => mainLoaded(handler), 100)
