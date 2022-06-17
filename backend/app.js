require('dotenv').config();
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const cookiesMiddleware = require('universal-cookie-express');
const authRouter = require('./routes/auth.routes');
const todoRouter = require('./routes/auth.routes');

const app = express();

app.use(express.urlencoded({ extended: true })); // читать тело запросов в формате urlencoded
app.use(express.json()); // читать тело запросов в формате JSON
app.use(cookiesMiddleware());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(session(
  {
    store: new FileStore(),
    name: 'user_sid',
    secret: process.env.SESSION_SECRET ?? 'test',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 12,
    },
  },
));

// ручки
app.use('/auth', authRouter);
app.use('/todo', todoRouter);

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port: 4000, Yo ASAKURA');
});
