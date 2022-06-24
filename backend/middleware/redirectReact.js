const path = require('path');

module.exports = function redirectToReact(req, res, next) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '../frontend/public/', 'index.html'));
  next();
};
