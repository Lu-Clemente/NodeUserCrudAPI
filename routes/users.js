const router = require('express').Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
const { nickname, name, age } = req.body;
const user = {
    nickname,
    name,
    age
}

try {
    await User.create(user);

    if (!name || !nickname || !age) {
        res.status(422).json({ error: "Invalid user." });
        return;
    }

    res.status(201).json({ message: "User successfully created!" });
} catch (err) {
    res.status(500).json({ error: err });
}
});

module.exports = router;