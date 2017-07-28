import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  slides = [
    {
      id: 1,
      image: 'assets/images/carousel/bridge-1.jpg',
      desc: 'desc about this bridge',
    },
    {
      id: 2,
      image: 'assets/images/carousel/bridge-2.jpg',
      desc: 'desc about this bridge',
    },
    {
      id: 3,
      image: 'assets/images/carousel/bridge-3.jpg',
      desc: 'desc about this bridge',
    },
    {
      id: 4,
      image: 'assets/images/carousel/bridge-4.jpg',
      desc: 'desc about this bridge',
    },
    {
      id: 5,
      image: 'assets/images/carousel/bridge-5.jpg',
      desc: 'desc about this bridge',
    }
  ];

  awesomeThings = [];
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('bshmApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.pug'),
    controller: MainController
  })
  .name;
