import Store from '../store'
import { STORE_EVENTS } from '../store/storeEvents.ts'
import ChatApi from '../api/ChatApi.ts'
import { IChat, IMessage } from '../types'

interface IWSClient {
  connect(chatId: number, ws: WebSocket): void;

  getSockets(): ChatSocket[];

  send(chatId: number, message: unknown): void;
}

interface ChatSocket {
  chatId: number,
  ws: WebSocket
}

function WSClient(): IWSClient {
    let instance: IWSClient | undefined
    const sockets: ChatSocket[] = []

    function WSClient(): void {
        if (!instance) instance = this as IWSClient
    }

    WSClient.prototype.getSockets = function() {
        return sockets
    }

    WSClient.prototype.connect = function(chatId: number, ws: WebSocket) {
        sockets.push({ chatId, ws })
        ws.addEventListener('open', () => {
            setInterval(() => ws.send(JSON.stringify({ type: 'ping' })), 5000)
            ChatApi.unreadCount(chatId).then(res => {
                const { unread_count: unreadCount } = res.data as { unread_count: number }
                let counter = 0
                while (unreadCount as number - counter > 20) {
                    getInstance().send(chatId, { content: `${counter}`, type: 'get old' })
                    counter += 20
                }
                getInstance().send(chatId, { content: `${unreadCount - counter}`, type: 'get old' })
            })
        })

        ws.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто')
            } else {
                console.log('Обрыв соединения')
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`)
        })

        ws.addEventListener('message', event => {
            if (!JSON.stringify(event.data).includes('message')) return
            setMessageToState(chatId, JSON.parse(event.data))
        })

        ws.addEventListener('error', event => {
            console.log('Ошибка', (event as ErrorEvent).message)
        })

    }

    WSClient.prototype.send = function(chatId: number, message: unknown) {
        const ws = sockets.find(socket => socket.chatId === chatId)?.ws as WebSocket
        try {
            ws.send(JSON.stringify(message))
        } catch (e) {
            console.log('Ошибка', e)
        }
    }
    const setMessageToState = (chatId: number, message: IMessage | IMessage[]) => {
        const chatList = Store.getState().chats.list
        const chatInfo = chatList.find(chat => chat.id === chatId) as IChat
        const messages = Array.isArray(message) ?
            sortMessages([...chatInfo.messages, ...message]) :
            sortMessages([...chatInfo.messages, message])
        chatList[chatList.indexOf(chatInfo)].messages = messages
        chatList[chatList.indexOf(chatInfo)].last_message = messages[messages.length - 1]
        Store.set('chats.list', [...chatList], STORE_EVENTS.CHAT_UPDATED_SUCCESS)
    }
    const sortMessages = (messages: IMessage[]) => [...new Set(messages.sort((message1, message2) =>
        Number(new Date(message1.time)) - Number(new Date(message2.time))
    ))]

    function getInstance(): IWSClient {
        if (!instance) return new (WSClient as any)() as IWSClient
        return instance
    }

    return getInstance()
}

export default WSClient()
