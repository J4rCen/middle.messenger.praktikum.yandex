/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express")
const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/dist`));

app.listen(PORT, () => {
    console.log(`Сервер запущен на ${PORT} порту`)
})
