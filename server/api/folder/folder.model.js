'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './folder.events';

var FolderSchema = new mongoose.Schema({
  name: String,
  title: String,
  icon: String
});

registerEvents(FolderSchema);
export default mongoose.model('Folder', FolderSchema);
