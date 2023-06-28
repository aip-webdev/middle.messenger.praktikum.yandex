export const waitElementBySelector = (selector: string, element: HTMLElement): Promise<HTMLElement> => {
    return new Promise((resolve) => {
        if (element.querySelectorAll(selector)[0] !== null) {
            return resolve(element.querySelectorAll(selector)[0] as HTMLElement)
        }
        const observer = new MutationObserver(() => {
            if (element.querySelectorAll(selector)[0]) {
                resolve(element.querySelectorAll(selector)[0] as HTMLElement)
                observer.disconnect()
            }
        })
        observer.observe(element, {
            childList: true,
            subtree: true
        })
    })
}
