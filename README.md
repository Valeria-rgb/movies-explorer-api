## Бэкенд дипломного пректа

- Реализована авторизация и регистрация пользователя
- Осуществляется контроль прав (нельзя удалить фильм, добавленный другим пользователем, а также нельзя присвоить email другого пользователя при обновлении информации о себе)
- Пароли хэшируются
- Реализована централизованная обработка ошибок
- Запросы валидируются
- Реализовано логирование запросов и ошибок

Информация о роутах:

#### GET /users/me возвращает информацию о пользователе (email и имя);
#### PATCH /users/me — обновляет информацию о пользователе;
#### GET /movies — все сохранённые пользователем фильмы;
#### POST /movies — создаёт фильм с переданными в теле данными;
#### DELETE /movies/movieId — удаляет сохранённый фильмы по _id;
#### POST /signup — создаёт пользователя с переданными в теле данными;
#### POST /signin — возвращает JWT, если в теле запроса переданы правильные почта и пароль.


  
API: https://my-diploma.nomoredomains.club/api

Публичный IP-адрес: 178.154.205.113
