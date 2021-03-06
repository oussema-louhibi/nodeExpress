import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes';

dotenv.config();
mongoose.Promise = global.Promise;

const app = express();
const PORT = process.env.APPLICATION_PORT;

app.use(bodyParser.json());

app.use('/healthz', (req, res) => {
  res.send('OK');
});

app.use('/users', router);

( async () => {
  try {
    // chango mongi with localhost to run projet in local
    await mongoose.connect("mongodb://mongo:27017/refreshjs", { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (e) {
    throw new Error(e);
  }
  app.listen(PORT, "0.0.0.0", () => console.log(`🚀 application ready at ${PORT}`));
})();
