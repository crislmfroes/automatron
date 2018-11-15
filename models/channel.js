const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const channelSchema = new Schema({
    name: String,
    dataPoints: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            entries: {
                umidade: Number
            }
        }
    ]
});
module.exports = mongoose.model('Channel', channelSchema);