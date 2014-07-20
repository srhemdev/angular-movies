'use strict';

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
