import {loginPage} from "../pages/LoginPage/index.js";
import {registrationPage} from "../pages/RegistrationPage/index.js";
import {serverErrorPage} from "../pages/ServerErrorPage/index.js";
import {chatPage} from "../pages/ChatPage/index.js";
import {mockChatList} from "../pages/ChatPage/mockChatList.js";
import {profilePage} from "../pages/ProfilePage/index.js";
import {userInfo} from "../components/UserInfo/index.js";
import {mockUserInfo} from "../components/UserInfo/mockUserInfo.js";

export const routes = {
    '': loginPage(),
    '/': loginPage(),
    '/signIn': loginPage(),
    '/signUp': registrationPage(),
    '/serverError': serverErrorPage(),
    '/profile': profilePage(userInfo(mockUserInfo, false, false)),
    '/chats': chatPage(undefined, mockChatList()),
}
