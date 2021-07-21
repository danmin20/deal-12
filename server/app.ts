import express, { Request, Response, NextFunction } from 'express';
// const path = require('path');
import morgan from 'morgan';
import 'dotenv/config';
import { initDatabase } from './database/database';
import router from './routes';
import { createServer } from 'http';
import { initSocket } from './socket';

const app = express();
const httpServer = createServer(app);
initSocket(httpServer);

(async function () {
  await initDatabase();
})();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found') as any;
  err.status = 404;
  next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({
    error: err.message,
  });
});

httpServer.listen(app.get('port'), '0.0.0.0', () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
