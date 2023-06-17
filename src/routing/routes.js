import {LoginPage} from "../pages/LoginPage/index.js";
import {RegistrationPage} from "../pages/RegistrationPage/index.js";
import {ServerErrorPage} from "../pages/ServerErrorPage/index.js";
import {ChatPage} from "../pages/ChatPage/index.js";
import {mockChatList} from "../pages/ChatPage/mockChatList.js";
import {ProfilePage} from "../pages/ProfilePage/index.js";
import {UserInfo} from "../components/UserInfo/index.js";
import {mockUserInfo} from "../components/UserInfo/mockUserInfo.js";

export const routes = {
    '': LoginPage(),
    '/': LoginPage(),
    '/signIn': LoginPage(),
    '/signUp': RegistrationPage(),
    '/serverError': ServerErrorPage(),
    '/profile': ProfilePage(UserInfo({userinfo: mockUserInfo, edit: false, editPass: false})),
    '/chats': ChatPage(mockChatList()),
}
