const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid/v4");
const octicons = require("octicons");

let rooms = require("./data/rooms.json");

router.get("/rooms", (req, res) => {
    const baseUrl = req.baseUrl;
    res.render("rooms", { title: "Admin Rooms", baseUrl, rooms, octicons });
});

router
    .route("/rooms/add")
    .get((req, res) => {
        const baseUrl = req.baseUrl;
        res.render("add", { baseUrl });
    })

    .post((req, res) => {
        const room = { name: req.body.name, id: uuidv4() };

        rooms.push(room);
        res.redirect(`${req.baseUrl}/rooms/`);
    });

router
    .route("/rooms/edit/:id")
    .all((req, res, next) => {
        const roomId = req.params.id;
        const room = rooms.find(room => room.id === roomId);

        if (!room) {
            res.sendStatus(404);
            return;
        }
        res.locals.room = room;
        next();
    })
    .get((req, res) => {
        const baseUrl = req.baseUrl;
        res.render("edit", { baseUrl });
    })
    .post((req, res) => {
        res.locals.room.name = req.body.name;
        res.redirect(`${req.baseUrl}/rooms/`);
    });

router.get("/rooms/delete/:id", (req, res) => {
    const roomId = req.params.id;
    rooms = rooms.filter(room => room.id !== roomId);

    res.redirect(`${req.baseUrl}/rooms/`);
});

module.exports = router;
