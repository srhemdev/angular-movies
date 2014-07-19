'use strict';

/* jasmine specs for controllers go here */
describe('Movies controllers', function() {
    beforeEach(module('movieApp'));
    beforeEach(module('movieServices'));
  

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  

  describe('MovieListCtrl', function(){
    it('should fetch movies list', inject(function(Movies, $httpBackend) {

    $httpBackend.expect('GET', 'https://api.themoviedb.org/3/collection/528?api_key=939a3346ba15aa366521cb3895a528fd')
      .respond([{
        "title": "The Terminator",
        "id": 218
      }, {
        "title": "Terminator 2: Judgment Day",
        "id": 280
      }]);

    Movies.getMovies()
      .then(function(response) {
        expect(response.data).toEqualData([{
        "title": "The Terminator",
        "id": 218
      }, {
        "title": "Terminator 2: Judgment Day",
        "id": 280
      }]);
    });

    $httpBackend.flush();
  }));
    
  });

  describe('MovieDetailCtrl', function(){
    it('should fetch movie detail', inject(function(Movies, $httpBackend) {

      $httpBackend.expect('GET', 'https://api.themoviedb.org/3/movie/296?api_key=939a3346ba15aa366521cb3895a528fd')
        .respond([{
          "title": "The Terminator",
          "id": 218
        }, {
          "title": "Terminator 2: Judgment Day",
          "id": 280
        }]);

      Movies.getMovieInfo(296)
        .then(function(response) {
          expect(response.data).toEqualData([{
          "title": "The Terminator",
          "id": 218
        }, {
          "title": "Terminator 2: Judgment Day",
          "id": 280
        }]);
      });

      $httpBackend.flush();
    }));

    it('should fetch movie credits', inject(function(Movies, $httpBackend) {

      $httpBackend.expect('GET', 'https://api.themoviedb.org/3/movie/296/credits?api_key=939a3346ba15aa366521cb3895a528fd')
        .respond([{
          "title": "The Terminator",
          "id": 218
        }, {
          "title": "Terminator 2: Judgment Day",
          "id": 280
        }]);

      Movies.getMovieCredits(296)
        .then(function(response) {
          expect(response.data).toEqualData([{
          "title": "The Terminator",
          "id": 218
        }, {
          "title": "Terminator 2: Judgment Day",
          "id": 280
        }]);
      });

      $httpBackend.flush();
    }));
  });
});


