/**
 * People model events
 */

'use strict';

import {EventEmitter} from 'events';
import People from './people.model';
var PeopleEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PeopleEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  People.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PeopleEvents.emit(event + ':' + doc._id, doc);
    PeopleEvents.emit(event, doc);
  }
}

export default PeopleEvents;
