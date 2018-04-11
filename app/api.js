const express = require('express');
const router = express.Router();
const messages = require('./data/messages.json');

const rooms = require('./data/rooms.json');

router.get('/rooms', (req, res) => {
    res.json(rooms);
});

router.get("/rooms/:roomId/messages", (req, res) => {
    const roomId = req.params.roomId;

    const roomMessages = messages.filter(message => message.roomId === roomId);
    const room = rooms.find(room => room.id === roomId);

    if (!room) {
        res.sendStatus(404);
        return;
    }

    res.json({
        room,
        messages
    });
});

module.exports = router;
