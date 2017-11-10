'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './channel.events';

var ChannelSchema = new mongoose.Schema({
  pid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
});

registerEvents(ChannelSchema);
export default mongoose.model('Channel', ChannelSchema);
