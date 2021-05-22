const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const schema = {
    address: { type: String, require: true },
    eventDate: { type: String, require: true },
}


const events_schema = new mongoose.Schema(schema);
const Event = mongoose.model('events', events_schema);
module.exports = Event;