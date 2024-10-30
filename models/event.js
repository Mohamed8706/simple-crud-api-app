const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50,
    },
    description: {
        type: String,
        maxlength: 500,
    },
    date: {
        type: Date,
        required: false,
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: 'Date must be in the future.',
        },
    },
    location: {
        type: String,
        required: true,
        maxlength: 100,
    },
    attendees: {
        type: [String],
        default: [],
    },
});

module.exports = mongoose.model('Event', EventSchema);
