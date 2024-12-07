
const calculationModel = require('../models/calculation');

// show index
exports.renderIndex = (req, res) => {
    res.render("index", {});
};

// add numbers
exports.addNumbers = async (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    console.log("num1:", num1);
    console.log("num2:", num2);

    if (!num1 || !num2) {
        return res.status(400).send('Please provide two numbers!');
    }

    const sum = parseInt(num1) + parseInt(num2);
    console.log("sum:", sum);

    const calculation = new calculationModel({
        num1: num1,
        num2: num2,
        sum: sum
    });

    try {
        await calculation.save();
        console.log('Calculation saved to MongoDB:', calculation);
        res.render('result', { num1, num2, sum });
    } catch (err) {
        console.error('Error saving calculation:', err);
        res.status(500).send('Error saving calculation to the database.');
    }
};

// get history
exports.getHistory = async (req, res) => {
    try {
        const calculations = await calculationModel.find();
        console.log(calculations);
        res.render('history', { calculations });
    } catch (err) {
        console.error('Error fetching history:', err);
        res.status(500).send('Error fetching history from the database.');
    }
};

// delete history
exports.deleteHistory = async (req, res) => {
    try {
        await calculationModel.deleteMany();
        console.log('All records deleted from MongoDB.');
        res.redirect('/history');
    } catch (err) {
        console.error('Error deleting records:', err);
        res.status(500).send('Error deleting records from the database.');
    }
};