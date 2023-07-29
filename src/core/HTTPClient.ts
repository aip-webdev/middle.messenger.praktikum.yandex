import queryStringify from '../utils/strings/querySringify.ts'

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  method: METHOD
  headers?: Indexed
  data?: never
  timeout?: number
  retries?: number
};

type OptionsWithoutMethod = Omit<Options, 'method'>;
type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<ResponseData>

export const BASE_URI = 'https://ya-praktikum.tech/api/v2'

interface ResponseData {
  data: unknown;
}

function HTTPClient(baseUri = '') {
    const get: HTTPMethod = (url, options = {}) => {
        return fetchWithRetry(url, { ...options, method: METHOD.GET })
    }

    const post: HTTPMethod = (url, options = {}): Promise<ResponseData> => fetchWithRetry(url, {
        ...options,
        headers: {
            ...options.headers,
            'Content-Type': 'application/json'
        },
        method: METHOD.POST
    })

    const put: HTTPMethod = (url, options = {}) => fetchWithRetry(url, {
        ...options,
        headers: {
            ...options.headers,
            'Content-Type': 'application/json'
        },
        method: METHOD.PUT
    })

    const putFile: HTTPMethod = (url, options = {}) => fetchWithRetry(url, {
        ...options,
        headers: {
            ...options.headers

        },
        method: METHOD.PUT
    })

    const del: HTTPMethod = (url, options = {}) => fetchWithRetry(url, {
        ...options,
        headers: {
            ...options.headers,
            'Content-Type': 'application/json'
        },
        method: METHOD.DELETE
    })

    function fetchWithRetry(url: string, options: Options): Promise<ResponseData> {
        const { method, data, headers, timeout, retries = 0 } = options
        let count = retries
        url = BASE_URI + baseUri + url
        return new Promise((resolve, reject) => {

            const makeRequest = () => {
                const xhr = new XMLHttpRequest()

                const onReject = () => {
                    return reject({
                        status: xhr.status,
                        reason: xhr.response.includes('{') ? JSON.parse(xhr.response).reason : xhr.statusText
                    })
                }

                const onResolve = () => {
                    const resolv = resolve({ data: xhr.response.includes('{') ? JSON.parse(xhr.response) as unknown : xhr.responseText })
                    return xhr.status === 500 ? onReject() :
                        xhr.status === 200 ? resolv : onReject()
                }
                if (method === METHOD.GET) {
                    const queryParams = options.data ? `?${queryStringify(options.data)}` : ''
                    url = `${url}${queryParams}`
                }
                xhr.withCredentials = true
                xhr.open(method, url)

                xhr.onload = () => {
                    onResolve()
                }
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        xhr.status === 500 ? onReject() :
                            xhr.status === 200 ? onResolve() : onReject()
                    }
                }

                xhr.onabort = () => onReject()

                xhr.onerror = () => {
                    if (count > 0) {
                        count--
                        makeRequest() // Retry the request
                    } else {
                        onReject()
                    }
                }

                xhr.ontimeout = () => onReject()

                xhr.timeout = timeout ? timeout : 5000
                if (headers) {
                    Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, <string>headers[key]))
                }

                if (method === METHOD.GET || !data) {
                    xhr.send()
                } else {
                    if (!(headers) || headers['Content-Type'] === 'application/json') {
                        xhr.send(JSON.stringify(data))
                    } else {
                        xhr.send(data)
                    }

                }

            }
            makeRequest()
        })
    }

    return Object.freeze({
        get,
        post,
        put,
        putFile,
        delete: del
    })
}

export default HTTPClient
