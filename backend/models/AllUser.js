const mongoose = require('mongoose');

// Flexible schema
const userSchema = new mongoose.Schema({}, { strict: false });
userSchema.set('timestamps', true);

const AllUser = mongoose.model('AllUser', userSchema);

module.exports = AllUser;
