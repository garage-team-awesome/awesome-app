'use strict';

angular.module('awesomeAppApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('chat', {
        url: '/chat',
        templateUrl: 'app/main/refugeePages/chat.template.html',
        controller: 'ChatController',
        controllerAs: 'vm',
        authenticate: 'user'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'app/main/refugeePages/home.template.html',
        controller: 'HomeController',
        controllerAs: 'vm'
        // authenticate: 'user'
      })
      .state('medical', {
        url: '/medical',
        templateUrl: 'app/main/refugeePages/medical.template.html',
        controller: 'MedicalController',
        controllerAs: 'vm',
        authenticate: 'user'
      }).state('people', {
        url: '/people',
        templateUrl: 'app/main/refugeePages/people.template.html',
        controller: 'PeopleController',
        controllerAs: 'vm',
        authenticate: 'user'
      })
      .state('person', {
        url: '/person',
        templateUrl: 'app/main/refugeePages/person.template.html',
        controller: 'PersonController',
        controllerAs: 'vm',
        authenticate: 'user'
      });
  });
