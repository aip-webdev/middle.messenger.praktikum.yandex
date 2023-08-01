import HTTPClient from '../core/HTTPClient.ts'
import { ILoginData, IUserData } from '../types'

function AuthApi() {
    const client = HTTPClient('/auth')

    const login = async (data: ILoginData) => {
        return await client.post('/signin', { data: data as never })
    }

    const logout = async () => {
        return await client.post('/logout')
    }

    const registration = async (data: IUserData) => {
        return await client.post('/signup', { data: data as never })
    }

    const getUser = async () => {
        return await client.get('/user')
    }

    return Object.freeze({
        login,
        logout,
        registration,
        getUser
    })

}

export default AuthApi()
