/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';

import Channel from '../api/channel/channel.model';

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }).then(() => {
      console.log('finished populating users');
      return User.find();
    })
    .then((users) => {
      return createChannels(users);
    })
    .then((channels) => {
      console.log('created the following channels:\n', channels);
    }, handleError);
  });

function createChannels(users) {
  return Channel.find().remove({})
  .then(() => {
    let now = new Date();
    return Channel.create([
      {
        name: 'Classroom',
        description: 'Classroom discussion',
        active: true,
        owner: users[0]._id,
        messages: [
          { text: 'First message.',  createdAt: now, user: users[0]._id },
          { text: 'Second message.', createdAt: now, user: users[1]._id }
        ]
      },
      {
        name: 'Outcomes',
        description: 'I Need a job!',
        active: true,
        owner: users[0]._id,
        messages: [
          { text: 'Third message.',  createdAt: now, user: users[0]._id },
          { text: 'Fourth message.', createdAt: now, user: users[1]._id }
        ]
      },
      {
        name: 'Resources',
        description: 'Where can I get more info?',
        active: true,
        owner: users[1]._id,
        messages: [
          { text: 'Fifth message.', createdAt: now, user: users[0]._id },
          { text: 'Sixth message.', createdAt: now, user: users[1]._id }
        ]
      }
    ]);
  }, handleError);
}

function handleError(err) {
  console.log('ERROR', err);
}
