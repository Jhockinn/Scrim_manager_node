import 'dotenv/config';

import express from 'express';
const app = express();

app.use(express.json());

/* =============================================================================== */

import teamsRouter from './routers/teamsRouter.js';
app.use(teamsRouter);

import scrimsRouter from './routers/scrimsRouter.js';
app.use(scrimsRouter);

/* =============================================================================== */

const PORT = process.env.PORT ?? 8080;

const server = app.listen(PORT, (error) => {
    if (error) {
        console.log("Error starting the server", error);
        return;
    }
    console.log('Server is running on port', server.address().port);
});
