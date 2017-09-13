/**
 * Folder model events
 */

'use strict';

import {EventEmitter} from 'events';
var FolderEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FolderEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Folder) {
  for(var e in events) {
    let event = events[e];
    Folder.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    FolderEvents.emit(`${event}:${doc._id}`, doc);
    FolderEvents.emit(event, doc);
  };
}

export {registerEvents};
export default FolderEvents;
