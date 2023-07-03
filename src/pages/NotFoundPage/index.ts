import { ErrorContent } from '../../components/ErrorContent'

export const NotFoundPage = () =>
    ErrorContent({
        code: '404',
        message: 'Не туда попали',
        linkText: 'Назад к чатам'
    })
