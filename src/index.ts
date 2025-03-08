import { DefaultDataSource } from '@config/data-source';
import { database } from '@config/database';
import express from 'express';

const PORT = 3000;

const app = express();
app.use(express.json());

const defaultDatabase = database('default', DefaultDataSource);
defaultDatabase.initialize({
  success: () => {
    app.listen(PORT, (err) => {
      if (err) {
        console.error('Unable to initialize server', err);
        process.exit(-1);
      }

      console.log(`Server listening at: http://localhost:${PORT}/`)
    });
  }
})