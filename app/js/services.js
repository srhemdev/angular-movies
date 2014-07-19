'use strict';

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
