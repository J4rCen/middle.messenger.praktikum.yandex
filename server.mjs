/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import fallback from 'express-history-api-fallback'
import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const app = express();
const PORT = 3000;
const root = `${__dirname}/dist`

app.use(express.static(root))
app.use(fallback('index.html', { root }))

app.listen(PORT, () => {
    console.log(`Сервер запущен на ${PORT} порту`)
})
