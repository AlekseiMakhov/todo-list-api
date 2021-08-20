const express = require('express');
const { connect } = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const {
  PORT, MONGODB_URI, MONGO_CFG,
} = require('./configs/constants');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/index');

const app = express();

app.use(cors());
connect(MONGODB_URI, MONGO_CFG);

app.use(express.json());
app.use(requestLogger);
app.use(helmet());

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
