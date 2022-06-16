const SALT_ROUNDS = 5;
const USER_NOT_FOUND = 'Пользователя с таким логином или паролем не существует';
const PORT = process.env.PORT ?? 4000;

module.exports = {
  SALT_ROUNDS,
  USER_NOT_FOUND,
  PORT,
};
