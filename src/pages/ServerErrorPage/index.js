import {errorContent} from "../../components/ErrorContent/index.js";

export const ServerErrorPage = (code = '500', message = 'Мы уже фиксим') =>
    errorContent(code, message, 'Назад к чатам')
