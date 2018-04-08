const express = require('express');
const router = express.Router();

const rooms = require('./data/rooms.json');

router.get('/rooms', (req, res) => {
    res.json(rooms);
});

module.exports = router;
