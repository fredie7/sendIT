"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var bodyParser = require('body-parser');

var morgan = require('morgan');

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
  extended: true
})); // module.exports = ()=> {
//     return 'hello'
// }

var authRoute = require('./routers/auth');

app.use('/api/v1/signup', authRoute.signup);
app.get('/', function (req, res) {
  return res.status(200).json({
    mesage: 'app started......'
  });
});
var PORT = process.env.PORT || 7000;
app.listen(PORT, function () {
  console.log("listening on port ".concat(PORT));
});