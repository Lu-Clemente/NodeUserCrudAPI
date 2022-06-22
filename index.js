const express = require('express');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users');
const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./swagger');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3333;

app.use(cors());

app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

app.use('/v1/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use('/v1/user', usersRoute);

app.get('/v1', (req, res) => {
    res.json({ message: "Nothing here!" });
});

const DB_USER = process.env.DB_USER;
const DB_PASS = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASS}@crudsimpleapicluster.gfzqe.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("MongoDb connected!");
        app.listen(port, () => console.log("Server running"));
    })
    .catch((err) => {
        console.error(err);
    });