'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './bridge.events';

var BridgeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  image: {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      unique: true,
      required: true
    }
  }
});

registerEvents(BridgeSchema);
export default mongoose.model('Bridge', BridgeSchema);
