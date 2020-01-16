import express from 'express';

const bodyParser = require('body-parser')
const morgan = require('morgan')
const expressValidator = require('express-validator');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(expressValidator());

const authRoute = require('./routers/auth');

app.use('/api/v1/auth', authRoute);

app.get('/', (req, res) => res.status(200).json({ mesage: 'app started......' }));

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

export default app;
