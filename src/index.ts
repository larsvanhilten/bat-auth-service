import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const { HTTP_PORT, ENVIRONMENT = 'develop' } = process.env;
const onListen = (error: any) => {
  if (error) {
    console.error(error, 'error starting server');
    process.exit(1);
  }

  console.info(`(${ENVIRONMENT} environment) server listening on :: ${HTTP_PORT}`);
};

const onError = (error: any) => {
  let message = '';

  switch (error.code) {
    case 'EACCES':
      message = `Port ${HTTP_PORT} requires elevated privileges`;
      break;
    case 'EADDRINUSE':
      message = `Port ${HTTP_PORT} is already in use`;
      break;
    default:
      message = error;
  }

  console.error(message);
  process.exit(1);
};

process.on('unhandledRejection', onError);
process.on('uncaughtException', onError);

app.once('error', onError);
app.listen(HTTP_PORT, onListen);
