/* eslint-disable no-invalid-this */
'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './section.events';
import Sensor from '../sensor/sensor.model';

var SectionSchema = new mongoose.Schema({
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
  }
});

SectionSchema.pre('remove', function(next) {
  Sensor.find({pid: this._id}).exec()
    .then(sensors => {
      sensors.forEach(sensor => { sensor.remove(); });
    });

  next();
});

registerEvents(SectionSchema);
export default mongoose.model('Section', SectionSchema);
