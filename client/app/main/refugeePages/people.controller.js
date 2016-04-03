'use strict';

class PeopleController {
  constructor($http, $scope) {
	$http.get('/api/peoples').then(function(response) {
		$scope.peoples = response.data;
	});
  }
}

angular.module('awesomeAppApp')
  .controller('PeopleController', PeopleController);