const express = require('express');
const reload = require('reload');
const app = express();
const rooms = require("./data/rooms.json");

app.set('port', process.env.PORT || 3000);
app.set('views', './app/views');
app.set('view engine', 'pug');

app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/popper.js/dist'));
app.use(express.static('./app/public'));


app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/admin/rooms', (req, res) => {
    res.render('rooms', {
        title: 'Admin Rooms',
        rooms: rooms
    });
});

reload(app);

app.listen(app.get('port'), () => {
    console.log(`Chat app listening on port ${app.get('port')}!`);
});
