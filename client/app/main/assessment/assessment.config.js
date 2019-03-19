'use strict';

import { ASSESSMENT_WEIGHT } from '../apps.weight';

export default function($stateProvider, $stateParamsProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
  'ngInject';

  // state
  $stateProvider
    .state('app.assessment', {
      url: '/assessment/:bridge',
      views: {
        'content@app': {
          template: require('./assessment.pug'),
          controller: 'AssessmentController as vm'
        }
      },
      resolve: {
        assessment: (msApi, $stateParams) => msApi.resolve(`assessment.${$stateParams.bridge}@get`)
      }
    })
    .state('app.assessment.report', {
      url: '/report',
      views: {
        'content@app': {
          template: require('./report.pug'),
          controller: 'AssessmentController as vm'
        }
      },
    });

  // api
  msApiProvider.register('assessment.baofu', ['app/data/assessment/baofu.json']);
  msApiProvider.register('assessment.nanlihe', ['app/data/assessment/nanlihe.json']);

  // translation
  $translatePartialLoaderProvider.addPart('app/main/assessment');

  // navigation
  msNavigationServiceProvider.saveItem('baofu.assessment', {
    title: 'assessment',
    icon: 'icon-stethoscope',
    state: 'app.assessment',
    stateParams: {bridge: 'baofu'},
    translate: 'assessment.ASSESSMENT_NAV',
    weight: ASSESSMENT_WEIGHT
  });
  msNavigationServiceProvider.saveItem('nanlihe.assessment', {
    title: 'assessment',
    icon: 'icon-stethoscope',
    state: 'app.assessment',
    stateParams: {bridge: 'nanlihe'},
    translate: 'assessment.ASSESSMENT_NAV',
    weight: ASSESSMENT_WEIGHT
  });
}

/* vim:set sw=2 ts=2 sts=2: */
