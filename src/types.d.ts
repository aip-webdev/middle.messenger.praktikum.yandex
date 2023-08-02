interface Indexed {
  [key: string]: unknown;
}

type AnyFun = (...args: (unknown)[]) => void | unknown

interface IUserData {
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

interface IChat {
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

interface IMessage {
  id?: string,
  chat_id?: number,
  user_id: number,
  time: string,
  content: string,
  type: string
  file?: IMessageFile
}

interface IMessageFile {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
}

interface ILoginData {
  login: string,
  password: string,
}

interface IChatsFormData {
  search: string;
  message: string;
}

interface IPasswordsData {
  oldPassword: string,
  newPassword: string,
}

interface IChatsState {
  loading: boolean,
  list: IChat[]
}

