/**
 * Broadcast updates to client when the model changes
 */

'use strict';

import BridgeEvents from './bridge.events';

// Model events to emit
var events = ['save', 'remove'];

export function register(socket) {
  // Bind model events to socket events
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var listener = createListener(`bridge:${event}`, socket);

    BridgeEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    BridgeEvents.removeListener(event, listener);
  };
}
