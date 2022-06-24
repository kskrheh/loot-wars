require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const cookiesMiddleware = require('universal-cookie-express');
const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/users.routes');
const lootRouter = require('./routes/loot.routes');
const redirectReact = require('./middleware/redirectReact');

const app = express();

app.use(express.urlencoded({ extended: true })); // читать тело запросов в формате urlencoded
app.use(express.json()); // читать тело запросов в формате JSON
app.use(cookiesMiddleware());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.static(path.join(__dirname, '../frontend/build')));
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
app.use('/users', usersRouter);
app.use('/loot', lootRouter);
// app.use(redirectReact);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port: ', process.env.PORT, 'Yo, Asakura');
});
