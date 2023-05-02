const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const port = 3000;

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

const alpacaRouter = require('./routers/alpacaRouter');

app.use(express.static('public'))

app.use('/alpaca', alpacaRouter);

app.get('/', (req, res) => {
    res.render('home', {title: 'Alpaca.cpp'});
});

app.get('/chat', (req, res) => {
   res.render('chat', {title : 'chat'})
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
