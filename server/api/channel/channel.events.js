/**
 * Channel model events
 */

'use strict';

import {EventEmitter} from 'events';
var ChannelEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ChannelEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Channel) {
  for (var e in events) {
    let event = events[e];
    Channel.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ChannelEvents.emit(`${event}:${doc._id}`, doc);
    ChannelEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ChannelEvents;
