
const express = require('express');
const app = new express();
const ejs = require('ejs');
const path = require('path');
const port = 3000;

const calculationModel = require('./models/calculation');

app.engine("html",ejs.__express)
app.set("view engine","html")

app.use(express.static('public'))
app.set('views', path.join(__dirname, 'public'));

app.get('/',function(req,res){
    res.render("index",{})
})

app.get('/add', async (req, res) => {
    const num1 = req.query.num1
    const num2 = req.query.num2
    console.log("num1:",num1);
    console.log("num2:",num2);

    const sum = parseInt(num1) + parseInt(num2);
    console.log("sum:",sum);
    
    
    if (!num1 || !num2) {
        return res.status(400).send('Please provide two numbers!');
    }

    const calculation = new calculationModel({
        num1: num1,
        num2: num2,
        sum: sum
    })

    try {
        await calculation.save();
        console.log('Calculation saved to MongoDB:', calculation);

        res.render('result', { num1, num2, sum });
    } catch (err) {
        console.error('Error saving calculation:', err);
        res.status(500).send('Error saving calculation to the database.');
    }

});

app.get('/history', async (req, res) => {
    try {
        const calculations = await calculationModel.find(); 
        console.log(calculations);
        
        res.render('history', { calculations }); 
    } catch (err) {
        console.error('Error fetching history:', err);
        res.status(500).send('Error fetching history from the database.');
    }
});

app.post('/history/delete', async (req, res) => {
    try {
        await calculationModel.deleteMany(); 
        console.log('All records deleted from MongoDB.');
        res.redirect('/history'); 
    } catch (err) {
        console.error('Error deleting records:', err);
        res.status(500).send('Error deleting records from the database.');
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
