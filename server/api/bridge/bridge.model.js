'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './bridge.events';

var BridgeSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(BridgeSchema);
export default mongoose.model('Bridge', BridgeSchema);
