export const waitElementsBySelector = (selector: string): Promise<NodeListOf<HTMLElement>> => {
    return new Promise((resolve) => {
        if (document.querySelectorAll(selector) !== null) {
            return resolve(document.querySelectorAll(selector) as NodeListOf<HTMLElement>)
        }
        const observer = new MutationObserver(() => {
            if (document.querySelectorAll(selector)) {
                resolve(document.querySelectorAll(selector) as NodeListOf<HTMLElement>)
                observer.disconnect()
            }
        })
        observer.observe(document, {
            childList: true,
            subtree: true
        })
    })
}
