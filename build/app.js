"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var bodyParser = require('body-parser');

var morgan = require('morgan');

var expressValidator = require('express-validator');

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(expressValidator());

var authRoute = require('./routers/auth');

app.use('/api/v1/auth', authRoute);
app.get('/', function (req, res) {
  return res.status(200).json({
    mesage: 'app started......'
  });
});
var PORT = process.env.PORT || 7000;
app.listen(PORT, function () {
  console.log("listening on port ".concat(PORT));
});
var _default = app;
exports["default"] = _default;