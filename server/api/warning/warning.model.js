'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './warning.events';

var WarningSchema = new mongoose.Schema({
  channel: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: false
  },
  level: {
    type: Number,
    required: true
  },
  principal: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  }
});

registerEvents(WarningSchema);
export default mongoose.model('Warning', WarningSchema);
