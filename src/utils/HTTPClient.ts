enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  method: METHOD;
  headers?: CommonObject;
  data?: never;
  timeout?: number;
  retries?: number
};

type OptionsWithoutMethod = Omit<Options, 'method'>;
export default function HTTPClient() {
    function get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        url = options.data ? `${url}${queryStringify(options.data)}` : url
        return fetchWithRetry(url, { ...options, method: METHOD.GET })
    }

    function post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return fetchWithRetry(url, {
            ...options,
            headers: {
                ...options.headers,
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: METHOD.POST
        })
    }

    function put(url: string, options: OptionsWithoutMethod = {}) {
        return fetchWithRetry(url, {
            ...options,
            headers: {
                ...options.headers,
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: METHOD.PUT
        })
    }

    function del(url: string, options: OptionsWithoutMethod = {}) {
        return fetchWithRetry(url, {
            ...options,
            method: METHOD.DELETE
        })
    }

    function fetchWithRetry(url: string, options: Options): Promise<XMLHttpRequest> {
        const { method, data, headers, timeout, retries = 0 } = options
        let count = retries

        return new Promise((resolve, reject) => {
            const makeRequest = () => {
                const xhr = new XMLHttpRequest()
                if (method === METHOD.GET) {
                    url = options.data ? `${url}${queryStringify(options.data)}` : url
                }
                xhr.open(method, url)

                xhr.onload = function() {
                    resolve(xhr)
                }

                xhr.onabort = reject
                xhr.onerror = () => {
                    if (count > 0) {
                        count--
                        makeRequest() // Retry the request
                    } else {
                        reject(new Error('Request timed out'))
                    }
                }
                xhr.ontimeout = reject

                xhr.timeout = timeout ? timeout : 5000
                if (headers) {
                    Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, <string>headers[key]))
                }
                if (method === METHOD.GET || !data) {
                    xhr.send()
                } else {
                    xhr.send(data)
                }
            }

            makeRequest()
        })
    }

    return Object.freeze({
        get,
        post,
        put,
        del
    })
}
const queryStringify = (data: CommonObject) => {
    const params = []
    for (const key in data) {
        let value = data[key]
        if (Array.isArray(value)) {
            value = value.join(',')
        }
        params.push(`${key}=${value}`)
    }
    return `?${params.join('&')}`
}
