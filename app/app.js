const express = require('express');
const http = require('http');
const reload = require('reload');
const app = express();

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

const server = http.createServer(app);

reload(app);

server.listen(app.get('port'), () => {
    console.log(`Chat app listening on port ${app.get('port')}!`);
});
