## Описание

### Учебный проект messenger от Яндекс.Практикум

[Сборка в Netlify](https://deploy-preview-5--reliable-salmiakki-311a25.netlify.app/)

[Ссылка на макет в Figma](https://www.figma.com/file/KNTCZXXiBQP3vwKKpwwD67/Chat_external_link-(Copy))

##### Команды сборки и запуска проекта:

- `npm run dev` — запуск в режиме разработки.
- `npm run preview` — предварительный просмотр стабильной версии.
- `npm run build` — сборка стабильной версии.
- `npm run start` — сборка и запуск стабильной версии.
- `npm run stylelint` - линтинг файлов стилей.
- `npm run stylelint:fix` - линтинг файлов стилей и исправление ошибок.
- `npm run eslint` - линтинг *.ts файлов.
- `npm run eslint:fix` - линтинг *.ts файлов и исправление ошибок.
- `npm run test` - запуск всех тестов.

___

#### Страницы и реализованный функционал:

- Авторизация ('', '/', '/signIn'):
    - на данный момент не реализован механизм авторизации
    - есть валидация полей
    - если поля заполнены, можно перейти на страницу чатов
- Регистрация ('/signUp'):
    - на данный момент не реализован механизм регистрации
    - есть валидация полей
    - если поля заполнены и корректны, можно перейти на страницу чатов
- Список чатов и лента переписки  ('/chats'):
    - Есть возможность выбрать чат и посмотреть его содержимое   ('/chats/:{id}')
    - Есть возможность перейти в настройки пользователя
    - Поиск чата, отправка сообщений и действия с чатом в данном спринте не реализованы
- Настройки пользователя ('/profile'):
    - Есть возможность перейти к редактированию информации пользователя ('/profile/edit')
    - Есть возможность перейти форме смены пароля ('/profile/changePassword')
    - Есть возможность вернуться к форме авторизации
    - Редактирование профиля, смена пароля на данный момент не реализованы, при нажатии кнопки 'Сохранить', если все
      поля
      заполнены и их значения корректны, происходит переход к настройкам пользователя
- Страница 404
    - Есть возможность вернуться к списку чатов
- Страница 5** ('/serverError')
    - Есть возможность вернуться к списку чатов

---

#### Sprint 2:

- Добавлены typescript, eslint, stylelint
- Добавлена фабричная функция Block для использования в компонентах. Осознанно выбран функциональный подход, по причине
  большей гибкости и применимости.
- Также добавлена фабричная функция HTTPClient для работы с запросами

#### Sprint 3:

- Добавлены API чатов, авторизации и пользователей
- Доработан роутинг
- Настроена отправка/получение сообщений в чатах
- В логах выводятся события, связанные с изменением стэйта, для наглядности
- Добавлены всплывающие сообщения, в случае ошибок при выполнении каких-либо действий

#### Sprint 4:

- добавлен vite-plugin-checker
- добавлены базовые тесты для Route, Router, HTTPClient, Block


