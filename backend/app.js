require('dotenv').config();
const express = require('express');
const cookiesMiddleware = require('universal-cookie-express');
const authRouter = require('./routes/auth.routes');
const todoRouter = require('./routes/auth.routes');

const app = express();

app.use(express.urlencoded({ extended: true })); // читать тело запросов в формате urlencoded
app.use(express.json()); // читать тело запросов в формате JSON
app.use(cookiesMiddleware());

// ручки
app.use('/auth', authRouter);
app.use('/todo', todoRouter);

app.listen(4000, () => {
  console.log('Listening on port: 4000, Yo ASAKURA');
});
