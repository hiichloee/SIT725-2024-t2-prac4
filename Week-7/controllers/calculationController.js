
const calculationModel = require('../models/calculation');

// show index
exports.renderIndex = (req, res) => {
    res.render("index", {});
};

// add numbers
exports.addNumbers = async (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;

    if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ result: null, statusCode: 400, message: 'Please provide two numbers!' });
    }

    const sum = parseInt(num1) + parseInt(num2);

    const calculation = new calculationModel({
        num1: num1,
        num2: num2,
        sum: sum
    });

    try {
        await calculation.save();
        console.log('Calculation saved to MongoDB:', calculation);
                
        if (
            req.query.format === 'json' ||
            req.headers.accept?.includes('application/json') ||
            req.headers['user-agent']?.includes('node')
        ) {
            return res.status(200).json({ result: sum, statusCode: 200 });
        }

        return res.render('result', { num1, num2, sum });
    } catch (err) {
        console.error('Error saving calculation:', err);
        return res.status(500).json({
            result: null,
            statusCode: 500,
            message: 'Error saving calculation to the database.',
        });
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