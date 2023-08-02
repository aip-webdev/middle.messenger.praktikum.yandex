import { expect } from 'chai'
import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon'
import HTTPClient, { BASE_URI, METHOD } from './HTTPClient.ts'


describe('HTTPClient', () => {
    let xhr: SinonFakeXMLHttpRequestStatic
    const requests: SinonFakeXMLHttpRequest[] = []
    let httpClient: any

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest()

        //@ts-expect-error
        global.XMLHttpRequest = sinon.useFakeXMLHttpRequest()

        xhr.onCreate = (req) => {
            requests.push(req)
        }

        httpClient = HTTPClient()
    })
    afterEach(() => {
        requests.length = 0
        xhr.restore()
    })

    describe('get', () => {
        it('should make a GET request with the given URL', async () => {
            const url = '/users'

            httpClient.get(url)

            const [request] = requests

            expect(request.method).to.equal(METHOD.GET)
            expect(request.url).to.equal(BASE_URI + url)
        })

        it('should add query parameters to the URL if options.data is provided', async () => {
            const url = '/users'
            const queryParams = { page: 1, limit: 10 }
            const expectedUrl = `${BASE_URI + url}?page=${queryParams.page}&limit=${queryParams.limit}`

            httpClient.get(url, { data: queryParams as never })

            const [request] = requests

            expect(request.method).to.equal(METHOD.GET)
            expect(request.url).to.equal(expectedUrl)
        })
    })

    describe('post', () => {
        it('should make a POST request with the given URL and data', async () => {
            const url = '/users'
            const data = { name: 'John Doe' } as never
            const expectedUrl = BASE_URI + url

            httpClient.post(url, { data })

            const [request] = requests

            expect(request.method).to.equal(METHOD.POST)
            expect(request.requestHeaders['Content-Type']).to.equal('application/json;charset=utf-8')
            expect(request.requestBody).to.equal(JSON.stringify(data))
            expect(request.url).to.equal(expectedUrl)
        })
    })

    describe('put', () => {
        it('should make a PUT request with the given URL and data', async () => {
            const url = '/users/1'
            const data = { name: 'John Doe' } as never
            const expectedUrl = BASE_URI + url

            httpClient.put(url, { data })

            const [request] = requests


            expect(request.method).to.equal(METHOD.PUT)
            expect(request.requestHeaders['Content-Type']).to.equal('application/json;charset=utf-8')
            expect(request.requestBody).to.equal(JSON.stringify(data))
            expect(request.url).to.equal(expectedUrl)
        })
    })

    describe('putFile', () => {
        it('should make a PUT request with the given URL and data', async () => {
            const url = '/files/1'
            const data = new FormData() as never
            const expectedUrl = BASE_URI + url


            httpClient.putFile(url, { data })

            const [request] = requests
          
            expect(request.method).to.equal(METHOD.PUT)
            expect(request.requestBody).to.equal(data)
            expect(request.url).to.equal(expectedUrl)
        })
    })

    describe('del', () => {
        it('should make a DELETE request with the given URL and data', async () => {
            const url = '/users/1'
            const expectedUrl = BASE_URI + url

            httpClient.delete(url)

            const [request] = requests

            expect(request.method).to.equal(METHOD.DELETE)
            expect(request.requestHeaders['Content-Type']).to.equal('application/json;charset=utf-8')
            expect(request.url).to.equal(expectedUrl)
        })
    })
})
