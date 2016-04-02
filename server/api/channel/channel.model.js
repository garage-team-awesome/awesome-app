'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Message = require('../message/message.model');

var ChannelSchema = new mongoose.Schema({
  name: String,
  description: String,
  active: Boolean,
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  messages: [Message.schema]
});

export default mongoose.model('Channel', ChannelSchema);
