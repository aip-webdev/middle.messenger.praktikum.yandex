import HTTPClient from '../core/HTTPClient.ts'
import omit from '../utils/common/omit.ts'

function UserApi() {
    const client = HTTPClient('/user')

    const changeUserData = async (userInfo: unknown) => {
        const data = omit(['id', 'password', 'avatar'], userInfo as Indexed)
        return await client.put('/profile', { data: data as never })
    }

    const changePassword = async (passwords: unknown) =>
        await client.put('/password', { data: passwords as never })


    const changeAvatar = async (formData: unknown) =>
        await client.putFile('/profile/avatar', { data: formData as never })

    const getUserById = async (id: number) =>
        await client.get(`/${id}`)

    const search = async (login: string) =>
        await client.post('/search', { data: { login: login } as never })

    return Object.freeze({
        changeUserData,
        changeAvatar,
        changePassword,
        getUserById,
        search
    })

}

export default UserApi()
