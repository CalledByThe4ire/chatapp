const uuidv4 = require("uuid/v4");
const octicons = require("octicons");

let rooms = require("./data/rooms.json");

module.exports = app => {

    app.get("/admin/rooms", (req, res) => {
        res.render("rooms", { title: "Admin Rooms", rooms, octicons });
    });

    app.get("/admin/rooms/add", (req, res) => {
        res.render("add");
    });

    app.post("/admin/rooms/add", (req, res) => {
        const room = { name: req.body.name, id: uuidv4() };

        rooms.push(room);
        res.redirect("/admin/rooms/");
    });

    app.get("/admin/rooms/edit/:id", (req, res) => {
        const roomId = req.params.id;
        const room = rooms.find(room => room.id === roomId);

        if (!room) {
            res.sendStatus(404);
            return;
        }

        res.render("edit", { room });
    });

    app.post("/admin/rooms/edit/:id", (req, res) => {
        const roomId = req.params.id;
        const room = rooms.find(room => room.id === roomId);

        if (!room) {
            res.sendStatus(404);
            return;
        }

        room.name = req.body.name;

        res.redirect("/admin/rooms/");
    });

    app.get("/admin/rooms/delete/:id", (req, res) => {
        const roomId = req.params.id;
        rooms = rooms.filter(room => room.id !== roomId);

        res.redirect("/admin/rooms/");
    });
}
