import { ErrorContent } from '../../components/ErrorContent'

export const ServerErrorPage = (code = '500', message = 'Мы уже фиксим') =>
    ErrorContent({ code, message, linkText: 'Назад к чатам' })
