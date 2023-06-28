export interface IChat {
  id: string,
  name: string,
  lastMessage: IMessage,
  unreadCount: number
}

export interface IMessage {
  text: string,
  time: string
}
