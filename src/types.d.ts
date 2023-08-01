export interface Indexed {
  [key: string]: unknown;
}

export type AnyFun = (...args: (unknown)[]) => void | unknown

export interface IUserData {
  id?: number,
  first_name: string,
  second_name: string,
  display_name?: string,
  login: string,
  email: string,
  password?: string,
  phone: string
  avatar?: string
}

export interface IChat {
  id: number,
  created_by?: number,
  title: string,
  avatar?: string,
  last_message?: IMessage,
  unread_count: number,
  users?: IUserData[]
  messages: IMessage[]
  token?: string
}

export interface IMessage {
  id?: string,
  chat_id?: number,
  user_id: number,
  time: string,
  content: string,
  type: string
  file?: IMessageFile
}

export interface IMessageFile {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
}

export interface ILoginData {
  login: string,
  password: string,
}

export interface IChatsFormData {
  search: string;
  message: string;
}

export interface IPasswordsData {
  oldPassword: string,
  newPassword: string,
}

export interface IChatsState {
  loading: boolean,
  list: IChat[]
}

