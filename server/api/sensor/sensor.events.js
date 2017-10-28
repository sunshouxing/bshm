/**
 * Sensor model events
 */

'use strict';

import {EventEmitter} from 'events';
var SensorEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SensorEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Sensor) {
  for (var e in events) {
    let event = events[e];
    Sensor.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    SensorEvents.emit(`${event}:${doc._id}`, doc);
    SensorEvents.emit(event, doc);
  };
}

export {registerEvents};
export default SensorEvents;
