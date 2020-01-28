import express from 'express';
import dotenv from 'dotenv';
const bodyParser = require('body-parser')
const morgan = require('morgan')
const expressValidator = require('express-validator');

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(expressValidator());

const authRoute = require('./routers/auth');
const parcelRoute = require('./routers/parcels');

app.use('/api/v1/auth', authRoute);
app.use('api/v1', parcelRoute);

app.get('/', (req, res) => res.status(200).json({ mesage: 'app started......' }));

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

export default app;
