/* eslint-disable no-invalid-this, camelcase */
'use strict';

import mongoose from 'mongoose';

var RealtimeDataSchema = new mongoose.Schema({
  channel_name: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  data: {
    type: [Number],
    required: true
  }
});

export default mongoose.model('RealtimeData', RealtimeDataSchema, 'channel_data');
