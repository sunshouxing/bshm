/* eslint-disable no-invalid-this */
'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './bridge.events';
import Section from '../section/section.model';

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

BridgeSchema.pre('remove', function(next) {
  Section.find({pid: this._id}).exec()
    .then(sections => {
      sections.forEach(section => { section.remove(); });
    });

  next();
});

registerEvents(BridgeSchema);
export default mongoose.model('Bridge', BridgeSchema);
