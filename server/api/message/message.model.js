'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var MessageSchema = new mongoose.Schema({
  text: String,
  createdAt: Date,
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  channelId: mongoose.Schema.ObjectId,
});

export default mongoose.model('Message', MessageSchema);
