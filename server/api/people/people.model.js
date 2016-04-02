'use strict';

import mongoose from 'mongoose';

var PeopleSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  isServiceProvider: Boolean,
  serviceProvided: String,
  email: String,
  telephone: String,
  description: String,
  additionalInfo: String,
  active: Boolean
});

export default mongoose.model('People', PeopleSchema);
