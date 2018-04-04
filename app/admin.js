const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid/v4");
const octicons = require("octicons");

let rooms = require("./data/rooms.json");

router.get("/rooms", (req, res) => {
    res.render("rooms", { title: "Admin Rooms", rooms, octicons });
});

router
    .route("/rooms/add")
    .get((req, res) => {
        res.render("add");
    })

    .post((req, res) => {
        const room = { name: req.body.name, id: uuidv4() };

        rooms.push(room);
        res.redirect(req.baseUrl + "/rooms/");
    });

router
    .route("/rooms/edit/:id")
    .get((req, res) => {
        const roomId = req.params.id;
        const room = rooms.find(room => room.id === roomId);

        if (!room) {
            res.sendStatus(404);
            return;
        }

        res.render("edit", { room });
    })
    .post((req, res) => {
        const roomId = req.params.id;
        const room = rooms.find(room => room.id === roomId);

        if (!room) {
            res.sendStatus(404);
            return;
        }

        room.name = req.body.name;

        res.redirect(req.baseUrl + "/rooms/");
    });

router.get("/rooms/delete/:id", (req, res) => {
    const roomId = req.params.id;
    rooms = rooms.filter(room => room.id !== roomId);

    res.redirect(req.baseUrl + "/rooms/");
});

module.exports = router;
