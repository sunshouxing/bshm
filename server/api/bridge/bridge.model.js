'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './bridge.events';

var BridgeSchema = new mongoose.Schema({
  from: {
    name: String,
    avatar: String,
    email: String
  },
  to: [
    {
      name: String,
      email: String
    }
  ],
  subject: String,
  message: String,
  time: String,
  read: Boolean,
  starred: Boolean,
  important: Boolean,
  hasAttachments: Boolean,
  attachments: [
    {
      type: {type: String},
      fileName: String,
      preview: String,
      url: String,
      size: String
    }
  ],
  labels: [Number]
});

registerEvents(BridgeSchema);
export default mongoose.model('Bridge', BridgeSchema);
