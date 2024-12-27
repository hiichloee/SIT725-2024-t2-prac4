var mongoose = require('./db')

var calculationSchema = mongoose.Schema({
    num1: Number,
    num2: Number,
    sum: Number,
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

module.exports=mongoose.model('calculation',calculationSchema);