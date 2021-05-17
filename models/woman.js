const mongoose = require('mongoose');
const Guard = require('./guard')
mongoose.set('useFindAndModify', false);

const schema = {
    username: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    phoneNumber: { type: String, required: true },
    guards: [ Guard.schema ]
}


const woman_schema = new mongoose.Schema(schema);
const Woman = mongoose.model('woman', woman_schema);
module.exports = Woman;