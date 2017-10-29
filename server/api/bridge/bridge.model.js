'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './bridge.events';

var BridgeSchema = new mongoose.Schema({
  name: String,
  desc: String,
  province: String,
  city: String,
  longitude: Number,
  latitude: Number,
  image: String,
  imageId: String
});

registerEvents(BridgeSchema);
export default mongoose.model('Bridge', BridgeSchema);
