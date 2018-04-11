const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
let messages = require('./data/messages.json');

const rooms = require('./data/rooms.json');

router.get('/rooms', (req, res) => {
    res.json(rooms);
});

router
    .route('/rooms/:roomId/messages')
    .get((req, res) => {
        const roomId = req.params.roomId;

        const roomMessages = messages.filter(
            message => message.roomId === roomId
        );
        const room = rooms.find(room => room.id === roomId);

        if (!room) {
            res.sendStatus(404);
            return;
        }

        res.json({
            room,
            messages
        });
    })
    .post((req, res) => {
        const roomId = req.params.roomId;
        const message = {
            roomId,
            text: req.body.text,
            userId: '44f885e8-87e9-4911-973c-4074188f408a',
            id: uuidv4()
        };
        messages.push(message);
        res.sendStatus(200);
    })
    .delete((req, res) => {
        const roomId = req.params.roomId;
        messages = messages.filter(message => message.roomId !== roomId);
        res.sendStatus(200);
    });

module.exports = router;
