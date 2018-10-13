/**
 * Warning model events
 */

'use strict';

import {EventEmitter} from 'events';
var WarningEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WarningEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Warning) {
  for (var e in events) {
    let event = events[e];
    Warning.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    WarningEvents.emit(`${event}:${doc._id}`, doc);
    WarningEvents.emit(event, doc);
  };
}

export {registerEvents};
export default WarningEvents;
