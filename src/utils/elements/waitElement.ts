export const waitElement = (id: string): Promise<HTMLElement> => {
    return new Promise((resolve) => {
        if (document.getElementById(id) !== null) {
            return resolve(document.getElementById(id) as HTMLElement)
        }
        const observer = new MutationObserver(() => {
            if (document.getElementById(id)) {
                resolve(document.getElementById(id) as HTMLElement)
                observer.disconnect()
            }
        })
        observer.observe(document.body, {
            childList: true,
            subtree: true
        })
    })
}
