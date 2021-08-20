require('dotenv').config();

const { PORT = 3000 } = process.env;
const { NODE_ENV } = process.env;
const MONGODB_URI = NODE_ENV !== 'production' ? 'mongodb://localhost:27017/todolist' : process.env.MONGODB_URI;

const MONGO_CFG = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

module.exports = {
  PORT, MONGODB_URI, MONGO_CFG,
};
