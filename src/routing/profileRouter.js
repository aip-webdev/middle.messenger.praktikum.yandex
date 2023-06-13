import {userInfo} from "../components/UserInfo/index.js";
import {profilePage} from "../pages/ProfilePage/index.js";
export const profileRouter = (path, userinfo) => {
    switch (path) {
        case 'edit':
            return profilePage(userInfo(userinfo, true, false ))
        case 'changePassword':
            return profilePage(userInfo(userinfo, false, true ))
    }
    return profilePage(userInfo(userinfo, false, false))
}
