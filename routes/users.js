const router = require('express').Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const { nickname, name, age } = req.body;
    const user = {
        nickname,
        name,
        age
    }

    if (!name || !nickname || !age) {
        res.status(422).json({ error: "Invalid user." });
        return;
    }

    try {
        await User.create(user);

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

router.get('/findByNickname', async (req, res) => {
    const { nickname } = req.query;

    try {
        const singleUser = await User.findOne({ nickname: nickname })

        if (!singleUser) {
            res.status(422).json({ error: "User not found." });
            return;
        }

        res.status(200).json({ message: "Success", user: singleUser });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const singleUser = await User.findById(id);

        if (!singleUser) {
            res.status(422).json({ error: "User not found." });
            return;
        }

        res.status(200).json({ message: "Success", user: singleUser });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    const { nickname, name, age } = req.body;
    const user = {
        nickname,
        name,
        age
    }

    if (!nickname && !name && !age) {
        res.status(422).json({ error: "No user was updated because there's no requested changes." });
        return;
    }

    try {
        const updatedUser = await User.updateOne({ _id: id }, user);

        if (updatedUser.matchedCount === 0) {
            res.status(404).json({ error: "User not found." });
            return;
        }

        res.status(200).json({ message: "User updated successfully." });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const singleUser = await User.findById(id);

    if (!singleUser) {
        res.status(404).json({ error: "User not found." });
        return;
    }

    try {
        const deletedUser = await User.deleteOne({ _id: id });

        if (deletedUser.deletedCount === 0) {
            res.status(404).json({ error: "User not found." });
            return;
        }

        res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;