/**
 * Bridge model events
 */

'use strict';

import {EventEmitter} from 'events';
var BridgeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BridgeEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Bridge) {
  for (var e in events) {
    let event = events[e];
    Bridge.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    BridgeEvents.emit(`${event}:${doc._id}`, doc);
    BridgeEvents.emit(event, doc);
  };
}

export {registerEvents};
export default BridgeEvents;
