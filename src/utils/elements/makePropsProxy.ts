type ProxyProps<T extends CommonObject> = {
  [P in keyof T]: T[P];
};

type ProxyHandler<T extends CommonObject> = {
  get(target: T, prop: string): unknown;
  set(target: T, prop: string, value: T[keyof T]): boolean;
  deleteProperty(target: T, prop: string): boolean;
};

export const makePropsProxy = <T extends CommonObject>(props: T): ProxyProps<T> => {
    const handler: ProxyHandler<T> = {
        get(target, prop) {
            const value = target[prop]
            return typeof value === 'function' ? value.bind(target) : value
        },
        set(target, prop, value) {
            target[prop as keyof T] = value
            return true
        },
        deleteProperty(target, prop) {
            delete target[prop]
            return true

        }
    }

    return new Proxy(props, handler) as ProxyProps<T>
}
