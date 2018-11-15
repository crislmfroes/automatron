const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const channelSchema = new Schema({
    name: String,
    userId: String,
    dataPoints: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            entries: [
                {
                    name: String,
                    value: String
                }
            ]
        }
    ]
});
module.exports = mongoose.model('Channel', channelSchema);