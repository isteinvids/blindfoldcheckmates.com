export const bfcApp = angular.module('bfcApp', ['ngRoute', 'hmTouchEvents']);
import * as chessUtils from './chessUtils.js';

bfcApp.config(function ($routeProvider) {
  // setup urls
  $routeProvider.when("/", {
    templateUrl: "../templates/home.html",
    controller: "HomeController",
    controllerAs: "childCtrl"
  });

  // runnigns
  $routeProvider.when("/1rookvking", {
    templateUrl: "../templates/1rookvking.html",
    controller: "GameController",
    controllerAs: "childCtrl"
  });

  // send to home if invalid url
  $routeProvider.otherwise({
    redirectTo: "/"
  });

});

console.log('bfcApp loaded');

// page controllers

import HomeController from './pages/controllers/HomeController.js';
import GameController from './pages/controllers/GameController.js';

bfcApp.controller('HomeController', HomeController);
bfcApp.controller('GameController', GameController);

import initLoading from './components/loading.js';
import initChessboard from './components/chessboard.js';

bfcApp.component('loading', initLoading());
bfcApp.component('chessboard', initChessboard());


// main controller:

bfcApp.controller('MainCtrl', ['$rootScope', '$scope', '$http', '$interval', '$timeout', '$location', function ($rootScope, $scope, $http, $interval, $timeout, $location) {
  this.goTo = (path) => {
    console.log('going to', path);
    $location.path(path);
  };
}]);

bfcApp.run(function ($rootScope) {
  $rootScope.keys = (ret) => ret ? Object.keys(ret) : [];
  $rootScope.values = (ret) => ret ? Object.values(ret) : [];
  $rootScope.sum = (arr) => arr.reduce((a, b) => a + b, 0);
  $rootScope.Math = Math;
  $rootScope.getTextColourFromBG = (str) => {
    if (!str) {
      return;
    }
    const rgb = parseColourCode(str);

    if (!rgb) {
      return;
    }

    var rounded = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);

    if (rounded > 135) {
      return 'black';
    }
    return 'white';
  };
  $rootScope.parseFloat = (num) => parseFloat(num) || 0;
  $rootScope.isString = (str) => typeof str == 'string';
  $rootScope.isNumber = (num) => typeof num == 'number';
  $rootScope.isObject = (obj) => typeof obj == 'object';
  $rootScope.parseInt = (num) => parseInt(num) || 0;
  $rootScope.range = (start, end) => {
    var input = [];
    for (var i = start; i < end; i++) {
      input.push(i);
    }
    return input;
  }
  $rootScope.max = (a, b) => Math.max(a, b);
  $rootScope.min = (a, b) => Math.min(a, b);
  $rootScope.round = (num, dec) => {
    const factor = Math.pow(10, dec);
    return Math.round(num * factor) / factor;
  };
  $rootScope.floor = (num) => Math.floor(num);
  $rootScope.document = {
    getElementById: (id) => document.getElementById(id),
    getElementsByClassName: (className) => document.getElementsByClassName(className),
    getElementsByTagName: (tagName) => document.getElementsByTagName(tagName),
  }
});

// show body
document.body.style = '';
