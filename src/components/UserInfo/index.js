import Handlebars from "handlebars";
import {getEditPasswordElements} from "./getEditPasswordElements.js";
import {getUserInfoElements} from "./getUserInfoElements.js";

export const UserInfo = ({userinfo, edit = false, editPass = false}) => {
    return Handlebars.compile(`${!editPass ? getUserInfoElements(userinfo, edit) : getEditPasswordElements()}`)()
}
