type ProxyProps<T extends Indexed> = {
  [P in keyof T]: T[P];
};

type ProxyHandler<T extends Indexed> = {
  get(target: T, prop: string): unknown;
  set(target: T, prop: string, value: T[keyof T]): boolean;
  deleteProperty(target: T, prop: string): boolean;
};

export const makePropsProxy = <T extends Indexed>(props: T): ProxyProps<T> => {
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
