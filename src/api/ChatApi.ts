import HTTPClient from '../core/HTTPClient.ts'

function ChatApi() {
    const client = HTTPClient('/chats')

    const getChats = async () => await client.get('')
    const createChat = async (data: unknown) =>
        await client.post('', { data: data as never })

    const deleteChat = async (id: number) =>
        await client.delete('', { data: { 'chatId': id } as never })

    const getArchiveChats = async () =>
        await client.get('/archive')
    const archiveChat = async (id: number) =>
        await client.post('/archive', { data: { chatId: id } as never })

    const unarchiveChat = async (id: number) =>
        await client.post('/unarchive', { data: { chatId: id } as never })

    const getCommonChat = async (id: number) => await client.get(`/${id}/common`)

    const getChatUsers = async (id: number, data?: unknown) =>
        await client.get(`/${id}/users`, { data: data as never })

    const unreadCount = async (id: number) => await client.get(`/new/${id}`)

    const changeChatAvatar = async (formData: FormData) =>
        await client.putFile('/avatar', { data: formData as never })

    const addUsersToChat = async (id: number, users: number[]) =>
        await client.put('/users', { data: { chatId: id, users: users } as never })
    const deleteUsersFromChat = async (id: number, users: number[]) =>
        await client.delete('/users', { data: { chatId: id, users: users } as never })

    const getConnectToken = async (id: number) => await client.post(`/token/${id}`)

    return Object.freeze({
        getChats,
        createChat,
        deleteChat,
        getArchiveChats,
        archiveChat,
        unarchiveChat,
        getCommonChat,
        getChatUsers,
        unreadCount,
        changeChatAvatar,
        addUsersToChat,
        deleteUsersFromChat,
        getConnectToken
    })

}

export default ChatApi()
