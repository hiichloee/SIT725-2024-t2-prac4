
const express = require('express');
const app = new express();
const ejs = require('ejs');
const port = 3000;

app.engine("html",ejs.__express)
app.set("view engine","html")
app.use(express.static('public'))

app.get('/',function(req,res){
    res.render("index",{})
})

app.get('/add', (req, res) => {
    const num1 = req.query.num1
    const num2 = req.query.num2
    console.log("num1:",num1);
    console.log("num2:",num2);

    const sum = parseInt(num1) + parseInt(num2);
    console.log("sum:",sum);
    
    
    if (!num1 || !num2) {
        return res.status(400).send('Please provide two numbers!');
    }

    res.send(`The sum of ${num1} and ${num2} is ${sum}.`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
