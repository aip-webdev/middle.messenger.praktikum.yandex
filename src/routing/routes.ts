import { LoginPage } from '../pages/LoginPage'
import { RegistrationPage } from '../pages/RegistrationPage'
import { ServerErrorPage } from '../pages/ServerErrorPage'
import { ChatPage } from '../pages/ChatPage'
import { mockChatList } from '../pages/ChatPage/mockChatList.js'
import { ProfilePage } from '../pages/ProfilePage'
import { UserInfo } from '../components/UserInfo'
import { mockUserInfo } from '../components/UserInfo/mockUserInfo.js'
import { BlockFactory } from '../utils/elements/Block.ts'

export interface IRoute {
  '': BlockFactory;
  '/error': BlockFactory;
  '/login': BlockFactory;
  '/registration': BlockFactory;
  '/chats': BlockFactory;
  '/': BlockFactory;
  '/profile': BlockFactory;
}

export const routes: IRoute = {
    '': LoginPage(),
    '/': LoginPage(),
    '/login': LoginPage(),
    '/registration': RegistrationPage(),
    '/error': ServerErrorPage(),
    '/profile': ProfilePage(
        UserInfo({ userinfo: mockUserInfo, edit: false, editPass: false })
    ),
    '/chats': ChatPage(mockChatList)
}
