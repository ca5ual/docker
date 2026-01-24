const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { notebookRouter } = require('./routes');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use('/api/notebook', notebookRouter);

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected MONGODB. Starting server.")
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}).catch(err => {
        console.error("Something went wrong");
        console.error(err);
});
