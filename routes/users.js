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

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();

        if (!allUsers) {
            res.status(422).json({ error: err });
            return;
        }

        res.status(200).json({ message: "Success", list: allUsers })
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const singleUser = await User.findById(id);

        if (!singleUser) {
            res.status(422).json({ error: err });
            return;
        }

        res.status(200).json({ message: "Success", user: singleUser });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;