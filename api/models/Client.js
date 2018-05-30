var mongoose = require('mongoose');

var clientInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('clients', clientInfoSchema);
