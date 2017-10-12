'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './file.events';

var FileSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(FileSchema);
export default mongoose.model('File', FileSchema);
