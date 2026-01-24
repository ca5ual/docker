const express = require('express');
const mongoose = require('mongoose');
const { noteRouter } = require('./routes');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use('/api/notes', noteRouter);

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected MONGODB. Starting server.")
    app.listen(port, () => {
        console.log(`Notes listening on port ${port}`);
    });
}).catch(err => {
        console.error("Something went wrong");
        console.error(err);
});
