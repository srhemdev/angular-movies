'use strict';

/* jasmine specs for controllers go here */
describe('Movie Details routes', function() {
	beforeEach(module('movieApp'));
	it('should map routes to controllers', function() {
  		module('movieApp');

  		inject(function($route) {

    	expect($route.routes['/'].controller).toBe('MovieListCtrl');
    	expect($route.routes['/'].templateUrl).
      	toEqual('partials/overview.html');

    	expect($route.routes['/:movieId'].templateUrl).
      	toEqual('partials/movie-detail.html');
        
    	expect($route.routes['/:movieId'].controller).
      	toEqual('MovieDetailCtrl');

    	// otherwise redirect to
    	expect($route.routes[null].redirectTo).toEqual('/')
        });
	});
});

describe('Directive: Terminator Movies List', function() {
 
  var element, scope;
 
  beforeEach(module('movieApp'));
 
  beforeEach(inject(function($rootScope, $compile) {
    element = angular.element("<ul><li ng-repeat='movieitem in movieslist'><a href='#/{{movieitem.id}}'>{{movieitem.title}}</a></li></ul>");
 
    scope = $rootScope;
 
    scope.movieslist = [{
        "title": "The Terminator",
        "id": 218
      }, {
        "title": "Terminator 2: Judgment Day",
        "id": 280
      }, {
        "title": "Terminator 3: Rise of the Machines",
        "id": 296
      }, {
        "title": "Terminator Salvation",
        "id": 534
      }, {
        "title": "Terminator: Genesis",
        "id": 87101
      }];
 
    $compile(element)(scope);
    scope.$digest();
  }));
 
  it("should have the correct amount of Terminator movies in the list", function() {
    var list = element.find('li');
    expect(list.length).toBe(5);
  });
});


