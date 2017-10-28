'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './section.events';

var SectionSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(SectionSchema);
export default mongoose.model('Section', SectionSchema);
