'use strict';

export default function SampleController(SampleData) {
  'ngInject';

  // Data
  this.helloText = SampleData.data.helloText;
}
