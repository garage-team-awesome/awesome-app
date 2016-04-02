'use strict';

angular.module('awesomeAppApp.auth', [
  'awesomeAppApp.constants',
  'awesomeAppApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
