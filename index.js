const express = require('express');

const app = express();
const port = 3000;

app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Nothing here!" });
});

app.listen(port, () => console.log("Server running"));