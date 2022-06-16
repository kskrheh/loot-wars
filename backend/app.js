require('dotenv').config();
const express = require('express');
// const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const authRouter = require('./routes/auth.routes');
const todoRouter = require('./routes/auth.routes');

const app = express();

app.use(express.urlencoded({ extended: true })); // читать тело запросов в формате urlencoded
app.use(express.json()); // читать тело запросов в формате JSON
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(session(
  {
    store: new FileStore(),
    name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
    secret: process.env.SESSION_SECRET ?? 'test', // Секретное слово для шифрования, может быть любым
    resave: false, // Пересохранять ли куку при каждом запросе
    saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
    cookie: {
      maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    },
  },
));

// ручки
app.use('/auth', authRouter);
app.use('/todo', todoRouter);

app.listen(4000, () => {
  console.log('Listening on port: 4000, Yo ASAKURA');
});
