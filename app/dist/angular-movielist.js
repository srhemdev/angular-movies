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
           template: "<div class='movieOuter' ng-repeat='movieitem in movieslist.parts'>"+
                     "<a ng-href='#/{{movieitem.id}}' ng-click='selectMovie(movieitem.id)' ng-init='selectMovie(initMovie)'>"+
                     "<div class='movieInner'><img ng-src='http://image.tmdb.org/t/p/w500{{movieitem.poster_path}}' ng-class='{ selected: movieitem.id == isMovieSelected }' class='circular'/></div>"+
                     "<h2 class='movieInner' ng-class='{ selected: movieitem.id == isMovieSelected }'>{{movieitem.title}}</h2>"+
                     "</a>"+
                     "</div>",           
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
;'use strict';

/**
 * @ngdoc object
 * @name moviesController
 * @requires $scope
 * @description
 *
 * Set the value of the model on the controller.
 *
 */

var movieControllers = angular.module('movieControllers', ['movieServices']);


/**
 * @ngdoc controller
 * @name moviesController
 * @requires $scope
 * @requires $http
 * @description
 *
 * Set the value of the movies list.
 *
 */

movieControllers.controller('MovieListCtrl', ['$scope', '$http', '$routeParams', '$location', 'Movies',
      function ($scope, $http, $routeParams, $location, Movies) {
       if($location.$$path != "undefined")
        $scope.initMovie = ($location.$$path).split("/")[1];

      console.log($scope.initMovie);
       $scope.movieslistImage = null;
        Movies.getMovies().then(function(response){
         $scope.movieslist = response.data;
         console.log($scope.movieslist);
         $scope.movieslistImage = "http://image.tmdb.org/t/p/w500/" + $scope.movieslist.poster_path;
        });
        $scope.isMovieSelected = null;
        $scope.selectMovie= function($index) {
          $scope.isMovieSelected = $index;
          console.log("is movie selected", $scope.isMovieSelected);
        };
}]);

/**
 * @ngdoc controller
 * @name moviesController
 * @requires $scope
 * @requires $http
 * @requires $routeParams
 * @description
 *
 * Set the value of the movie details.
 *
 */

movieControllers.controller('MovieDetailCtrl', ['$scope', '$routeParams', '$http', 'Movies',
  function($scope, $routeParams, $http, Movies) {

    $scope.movieImage = null;
    Movies.getMovieInfo($routeParams.movieId).then(function(response){
  	 $scope.movie = response.data;
     $scope.movieImage = "http://image.tmdb.org/t/p/w500" +  $scope.movie.poster_path;
  	});
  	
  	Movies.getMovieCredits($routeParams.movieId).then(function(response){
  	 $scope.credits = response.data;
     console.log("credits", $scope.credits);
  	});
	 
    $scope.imgValue = null;
    $scope.isSelected = null;
    $scope.changeImage = function($index) {
      $scope.imgValue = "http://image.tmdb.org/t/p/w500" + $scope.credits.cast[$index].profile_path;
      $scope.isSelected = $index;
    };

    
  }]);
;'use strict';

/**
 * @ngdoc movieServices  
 * @name movieApp.movieServices 
 * @requires $http 
**/

var movieServices = angular.module('movieServices', []);

/**
 * @ngdoc method
 * @name movieApp.movieServices #getMovies //.# 
 * @methodOf ng.service // .
 * @returns {object} 
 */

 /**
 * @ngdocs method
 * @name movieApp.movieServices #getMovieInfo //.# 
 * @methodOf ng.service // .
 * @returns {object} 
 */

 /**
 * @ngdoc method
 * @name movieApp.movieServices #getMovieCredits //.# 
 * @methodOf ng.service // .
 * @returns {object} 
 */

movieServices.factory('Movies', ['$http',
  function($http){
    var urlBase = 'https://api.themoviedb.org/3/';
    var movieFactory = {};

    movieFactory.getMovies = function () {
        return $http({
   					url: urlBase + "collection/528", 
   					method: "GET",
   					cache : true,
   					params: {api_key:'939a3346ba15aa366521cb3895a528fd'}
				});
    };

    movieFactory.getMovieInfo = function (id) {
         return $http({
   					url: urlBase + "movie/" + id, 
   					method: "GET",
   					cache : true,
   					params: {api_key:'939a3346ba15aa366521cb3895a528fd'}
				});
    };

	movieFactory.getMovieCredits = function (id) {
        return $http({
   					url: urlBase + "movie/" + id + "/credits", 
   					method: "GET",
   					cache : true,
   					params: {api_key:'939a3346ba15aa366521cb3895a528fd'}
				});
    };
    return movieFactory;
}]);
