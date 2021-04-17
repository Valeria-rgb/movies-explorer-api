const conflictErrorText = 'Пользователь с таким email уже существует!';
const badRequestErrorText = 'Переданы некорректные данные!';
const unauthorizedErrorText = 'Неправильные почта/пароль';
const notFoundUserErrorText = 'Пользователь с данным id не найден';
const notFoundFilmErrorText = 'Фильм с таким id не найден';
const notFoundContentErrorText = 'Запрашиваемый ресурс не найден';
const forbiddenErrorText = 'Нет! Вы не можете удалять фильмы других пользователей';
const filmIsDeletedText = 'Фильм удалён успешно!';
const authorizationIsNeededText = 'Необходима авторизация';

module.exports = {
  conflictErrorText,
  badRequestErrorText,
  unauthorizedErrorText,
  notFoundFilmErrorText,
  notFoundUserErrorText,
  notFoundContentErrorText,
  forbiddenErrorText,
  filmIsDeletedText,
  authorizationIsNeededText,
};
