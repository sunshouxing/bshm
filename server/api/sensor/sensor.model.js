'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './sensor.events';

var SensorSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(SensorSchema);
export default mongoose.model('Sensor', SensorSchema);
