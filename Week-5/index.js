
const express = require('express');
const app = new express();
const ejs = require('ejs');
const path = require('path');
const port = 3000;

app.engine("html",ejs.__express)
app.set("view engine","html") 

app.use(express.static('public'))

const calculationController = require('./controllers/calculationController');

// routers
app.get('/', calculationController.renderIndex); // show index
app.get('/add', calculationController.addNumbers); // add numbers
app.get('/history', calculationController.getHistory); // get history
app.post('/history/delete', calculationController.deleteHistory); // delete history


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
