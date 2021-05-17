const mongoose = require('mongoose');

const schema = {
    name: { type: String, required: true },
    phoneNumber: { type: String, required:true },
}


const guard_schema = new mongoose.Schema(schema);
const Guard = mongoose.model('guard', guard_schema);
module.exports = Guard;