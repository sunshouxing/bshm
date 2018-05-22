'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './warning.events';

var WarningSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(WarningSchema);
export default mongoose.model('Warning', WarningSchema);
