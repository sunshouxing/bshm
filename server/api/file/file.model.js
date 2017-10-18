'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './file.events';

var FileSchema = new mongoose.Schema({
  name: String,
  type: String,
  owner: String,
  size: Number,
  flowId: String,
  modified: Date,
  opened: Date,
  created: Date,
  extention: String,
  location: String,
  offline: Boolean,
  preview: String
});

registerEvents(FileSchema);
export default mongoose.model('File', FileSchema);
