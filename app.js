import express from 'express';
import cookieParser from 'cookie-parser';
import { router } from './src/routes/router.js';

const app = express();

app.use(cookieParser());

router(app);

let timestamp = new Date();

export function getPortNumber() {
    return 8888;
}

console.log(`Listening on ${getPortNumber()}- ${timestamp}`);
app.listen(getPortNumber());