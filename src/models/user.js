const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  gender: {
    type: Boolean,
  },
  email: {
    type: String,
  },
  birthYear: {
    type: Number,
  },
  phone: {
    type: String,
  },
  userType: {
    type: Boolean,
    required: true,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  __v: {
    type: Number,
    select: false,
  },
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
});

// eslint-disable-next-line func-names
schema.methods.hashPassword = async function () {
  const genPassword = this.firstName + this.phone;
  this.password = await bcrypt.hash(genPassword, 10);
};

schema.methods.validatePassword = async function (firstName, phone) {
  const validPassword = await bcrypt.compare((firstName + phone), this.password);
  return validPassword;
};

module.exports = model('User', schema);
