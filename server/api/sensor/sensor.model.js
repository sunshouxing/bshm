'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './sensor.events';

var SensorSchema = new mongoose.Schema({
  pid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  desc: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  axis: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  image: {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  channels: [{
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String
    }
  }]
});

registerEvents(SensorSchema);
export default mongoose.model('Sensor', SensorSchema);
