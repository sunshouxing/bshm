'use strict';

export default class SensorMonitor {
  /*********************
   *       Data        *
   *********************/

  // only display data in latest 30 nimutes
  MAX_DATA_LEN = 50 * 60 * 10;

  // defines how often to fetch the sensor data
  FETCH_DATA_INTERVAL = 1000;

  // the data's time offset of next query
  queryTime = parseInt(Date.now() / 1000) - 600;

  // the current monitoring sensor
  currentSensor = null;

  /*********************
   *      Methods      *
   *********************/
  constructor() {}

  $onInit() {}
}

/* vim:set sw=2 ts=2 sts=2: */
