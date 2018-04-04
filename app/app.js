const express = require("express");
const reload = require("reload");
const bodyParser = require("body-parser");

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", "./app/views");
app.set("view engine", "pug");

app.use(express.static("node_modules"));
app.use(express.static("./app/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

const adminRouter = require("./admin");
app.use("/admin", adminRouter);

reload(app);

app.listen(app.get("port"), () => {
    console.log(`Chat app listening on port ${app.get("port")}!`);
});
