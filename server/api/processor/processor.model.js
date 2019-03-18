'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './processor.events';

var ProcessorSchema = new mongoose.Schema({
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

registerEvents(ProcessorSchema);
export default mongoose.model('Processor', ProcessorSchema);
