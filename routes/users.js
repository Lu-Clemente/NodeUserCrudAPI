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

        res.status(201).json({ ok: "Success", message: "User successfully created!" });
    } catch (err) {
        res.status(500).json({ error: "Request fail." });
        console.log('[ERROR 101] ' + err);
    }
});

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({}, { __v: 0 });

        if (!allUsers) {
            res.status(422).json({ error: "Unable to get users" });
            return;
        }

        res.status(200).json({ ok: "Success", list: allUsers })
    } catch (err) {
        res.status(500).json({ error: "Request fail." });
        console.log('[ERROR 102] ' + err);
    }
});

router.get('/findByNickname', async (req, res) => {
    const { nickname } = req.query;

    try {
        const singleUser = await User.findOne({ nickname: nickname }, { __v: 0 })

        if (!singleUser) {
            res.status(422).json({ error: "User not found." });
            return;
        }

        res.status(200).json({ ok: "Success", user: singleUser });
    } catch (err) {
        res.status(500).json({ error: "Request fail." });
        console.log('[ERROR 103] ' + err);
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const singleUser = await User.findById(id, { __v: 0 });

        if (!singleUser) {
            res.status(422).json({ error: "User not found." });
            return;
        }

        res.status(200).json({ ok: "Success", user: singleUser });
    } catch (err) {
        res.status(500).json({ error: "Request fail." });
        console.log('[ERROR 104] ' + err);
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

        res.status(200).json({ ok: "Success", message: "User updated successfully." });
    } catch (err) {
        res.status(500).json({ error: "Request fail." });
        console.log('[ERROR 105] ' + err);
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

        res.status(200).json({ ok: "Success", message: "User deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: "Request fail." });
        console.log('[ERROR 106] ' + err);
    }
});

module.exports = router;