import { STORE_EVENTS } from '../store/storeEvents.ts'
import checkFailurePromise from '../utils/decorators/checkFailureResponse.ts'
import Store from '../store'
import ChatApi from '../api/ChatApi.ts'
import { getFormData } from '../utils/validation/getFormData.ts'
import Router from '../routing/Router.ts'
import { ChatContent } from '../components/ChatContent'
import { ChatPage } from '../pages/ChatPage'
import { ROUTES } from '../routing'
import UserApi from '../api/UserApi.ts'
import { merge } from 'immutable'
import WSClient from '../core/WSClient.ts'

function ChatActions() {
    const getChats = async () => {
        Store.merge({ chats: { loading: true } }, STORE_EVENTS.GET_CHATS)
        await ChatApi.getChats().then(req => {
            const chatList = [...Array.from(req.data as [])] as IChat[]
            chatList.forEach(chatInfo =>
                Router.use(ROUTES.CHAT(chatInfo.id), ChatPage({ content: ChatContent(chatInfo) }))
            )
            Store.set('chats.list', chatList, STORE_EVENTS.GET_CHATS_SUCCESS)
            Store.set('chats.loading', false)
            Store.set('error', { code: null, reason: '' })
            return chatList as IChat[]
        }).then(chatList => {
            chatList.map(chatInfo => {

                const promises = []
                promises.push(ChatApi.getChatUsers(chatInfo.id))
                Promise.all(promises).then(([resUsers]) => {
                    let usersList = resUsers.data as IUserData[] | string
                    usersList === '[]' ? usersList = [] as IUserData[] : usersList
                    chatList[chatList.indexOf(chatInfo)] = merge(chatInfo, { users: usersList, messages: [] })
                    Store.set('chats.list', [...chatList])
                    return chatList
                }).then(() => {
                    Store.getState().chats.list.forEach(chat => {
                        if (WSClient.getSockets().find(socket => socket.chatId === chat.id)) return
                        ChatApi.getConnectToken(chat.id).then(res => {
                            const tokenIndexed = res.data as Indexed
                            tokenIndexed.token && WSClient.connect(chat.id, new WebSocket(`wss://ya-praktikum.tech/ws/chats/${Store.getState().user?.id}/${chat.id}/${tokenIndexed.token}`))
                        })

                    })
                })

            })
        })
    }

    const createChat = async () => {
        const form = getFormData()
        await ChatApi.createChat(form)
        Store.merge({ error: { code: null, reason: '' } }, STORE_EVENTS.CREATE_CHAT_SUCCESS)
        await ChatActions().getChats()
    }

    const deleteChat = async () => {
        await ChatApi.deleteChat(getChatId())
        Store.merge({ error: { code: null, reason: '' } }, STORE_EVENTS.DELETE_CHAT_SUCCESS)
        Router.go(ROUTES.MESSENGER)
        await ChatActions().getChats()
    }

    const addUserToChat = async () => {
        const login = (getFormData() as IUserData)['login']
        return searchUserByLogin(login).then((value) => {
            const chatId = getChatId()
            if (checkUserInChat(chatId, login)) {
                Store.merge({
                    error: {
                        code: null,
                        reason: `Пользователь ${login} уже добавлен в чат`
                    }
                }, STORE_EVENTS.DELETE_USER_FROM_CHAT_FAILURE)
                return null
            }
            if (value && value.id)
                ChatApi.addUsersToChat(chatId, [value.id]).then(() => {
                    Store.merge({ error: { code: null, reason: '' } }, STORE_EVENTS.ADD_USER_TO_CHAT_SUCCESS)
                    Router.go(ROUTES.MESSENGER)
                    ChatActions().getChats()
                })
        })
    }

    const deleteUserFromChat = async () => {
        const login = (getFormData() as IUserData)['login']
        searchUserByLogin(login).then((value) => {
            const chatId = getChatId()
            if (!checkUserInChat(chatId, login)) {
                Store.merge({
                    error: {
                        code: null,
                        reason: `Пользователя ${login} нет в списке чата`
                    }
                }, STORE_EVENTS.DELETE_USER_FROM_CHAT_FAILURE)
                return null
            }
            if (value && value.id)
                ChatApi.deleteUsersFromChat(chatId, [value.id]).then(() => {
                    Store.merge({ error: { code: null, reason: '' } }, STORE_EVENTS.DELETE_USER_FROM_CHAT_SUCCESS)
                    Router.go(ROUTES.MESSENGER)
                    ChatActions().getChats()
                })
        })
    }

    const checkUserInChat = (id: number, login: string) => {
        const chat = Store.getState().chats.list.find(value => value.id === id)
        const chatUsers = chat?.users?.map(value => value.login)
        return chatUsers?.includes(login)
    }

    const searchUserByLogin = (login: string) => UserApi.search(login).then(res => {
        const users = res.data as IUserData[]
        const firstUser = Array.from(users).filter(user => user.login === login)[0]
        if (!firstUser?.id) {
            Store.merge({
                error: {
                    code: null,
                    reason: `Пользователь ${login} не найден`
                }
            }, STORE_EVENTS.ADD_USER_TO_CHAT_FAILURE)
            return null
        }
        return firstUser
    })

    const getChatId = () => parseInt(window.location.pathname.replace('/messenger/', '')) || 0

    return Object.freeze({
        getChats: checkFailurePromise(getChats, STORE_EVENTS.GET_CHATS_FAILURE),
        createChat: checkFailurePromise(createChat, STORE_EVENTS.CREATE_CHAT_FAILURE),
        deleteChat: checkFailurePromise(deleteChat, STORE_EVENTS.DELETE_CHAT_FAILURE),
        addUserToChat: checkFailurePromise(addUserToChat, STORE_EVENTS.ADD_USER_TO_CHAT_FAILURE),
        deleteUserFromChat: checkFailurePromise(deleteUserFromChat, STORE_EVENTS.DELETE_USER_FROM_CHAT_FAILURE)
    })
}

export default ChatActions()
