'use strict';

/**
 * @ngdoc overview 
 * @name app.js
 * @requires $routeProvider
 * @description
 *
 * This is the main script, which does the following:
 *
 * - Adds a directive
 * - defines routes via `$routeProvider`
 *
 */

var movieApp = angular.module('movieApp', [
  'ngRoute',
  'movieControllers',
  'movieServices'
]);

/**
 * @ngdoc directive
 * @name movieApp.directive:movielist
 * @element ul
 *
 * @description
 * Creates a list dynamically based on the number of movies named added.
 */

movieApp.directive('movielist', function() {
    return {
           restrict: 'E',
           template: "<div class='movieOuter' ng-repeat='movieitem in movieslist.parts'>
                     <a href='#/{{movieitem.id}}'>
                     <div class='movieInner'><img ng-src='http://image.tmdb.org/t/p/w500{{movieitem.poster_path}}' class='circular'/></div>
                     <h2 class='movieInner'>{{movieitem.title}}</h2>
                     </a>
                     </div>",           
           replace: true,
           controller: 'MovieListCtrl'
            }
});

movieApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/overview.html',
        controller: 'MovieListCtrl'
      }).
      when('/:movieId', {
        templateUrl: 'partials/movie-detail.html',
        controller: 'MovieDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
