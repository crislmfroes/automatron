const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const channelSchema = new Schema({
    name: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    dataPoints: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            entries: [
                {
                    name: String,
                    value: Schema.Types.Mixed
                }
            ]
        }
    ]
});



module.exports = mongoose.model('Channel', channelSchema);