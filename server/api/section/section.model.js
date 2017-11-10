'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './section.events';

var SectionSchema = new mongoose.Schema({
  bid: {type: mongoose.Schema.Types.ObjectId, required: true},
  name: {type: String, unique: true, required: true},
  desc: {type: String, required: true},
  axis: {
    x: {type: Number, required: true},
    y: {type: Number, required: true}
  },
  image: {
    name: {type: String, required: true},
    path: {type: String, required: true}
  }
});

registerEvents(SectionSchema);
export default mongoose.model('Section', SectionSchema);
