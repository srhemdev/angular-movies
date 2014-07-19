# Terminator Movie Collection Application

## Overview

This application shows a list of the Terminator movies Collection.
On the top you would see a HOME link which would show you the current page.
On the left side you would see the list of movies from the Terminator Collection.
On the right you would see the details of the movie that was name clicked from the movie list.
Clicking on any of the movie will update the Movie Detail View.


### Main Page index.html

- Added ngApp directive to html so know that we are using AngularJS

- Implemented an index.html page which contains 
  - HOME link
  - A Movies List section
  - A Movie Details View

### Partials

- Implemented a partial overview.html page which contains 
  - Image of the Terminator Collection
  - Description of "The Terminator Collection"
  
- Implemented a partial movie-detail.html page which contains 
  - Movie Name and description
  - Cast Members names and an image thumbnail.
  

### movieApp Module

- Added the [$route] service in movieApp module
- Added the 'movielist' directive in the movieApp module which uses ngRepeat to display the names of all the movies obtained from the 
  `MovieListCtrl`
- Added end2end tests to test these features.

### Controllers

 - MovieListCtrl
  	- Implemented `MovieListCtrl` controller to fetch the list of movies using the `Movies` service.
	- Based on the Movie name clicked from the 'Movies List' the Movie detail view gets updated.


 - MovieDetailCtrl
	- Implemented `MovieDetailCtrl` controller to fetch the details for a specific movie using the `Movies` service.
	- Based on the Movie name clicked from the 'Movies List' the Movie detail view gets updated.

	In the Movie detail view, clicking on an actors name will change the show the image of that actors in a thumbnail image.
	- Created `changeImage()` function which changes the image url.
	- Register an expression with the `ngClick` directive on actors names, using
  	`changeImage()`.
	- Added e2e tests for this feature.


### Routes

 - Upon clicking any movie name it would route movie in the same page by passing the movie id
   and replace contents in `ngView` directive.

 - Created a Movie details route:
   - Map `/<movie-id>` route to `MovieDetailCtrl` and `partials/movie-detail.html`.
  
 - Added e2e tests that verify the routes.
  

### Movies Service

 - Created a custom `Movies` service that has functions which return responses based on the kind of data needed.
   Makes use of the $http service provided by AngulaJS.

   Movies.getMovieList():
    
   - Returns Movie Collection list from the Collection API: https://api.themoviedb.org/3/collection/528.
  
  Movies.getMovieInfo():
  
   - Returns Movie Detail from the Movie API: https://api.themoviedb.org/3/movie/{id} 
  
  Movies.getMovieCredits():
   - Returns Movie Cast Members Names from the Credits API: https://api.themoviedb.org/3/movie/{id}/credits 

### Running the app

- Run `npm start`
- Navigate your browser to `http://localhost:8000/app/index.html` to see the app running in your browser.

### Running unit tests

- Start Karma with `npm test`

## Movie Application Directory Layout

    app/                --> all of the files to be used in production
      css/              --> css files
        main.css         --> The compiled stylesheet using SASS
      sass/
          partials/
                  main.scss       --> Importing the below mentioned .scss files
                  _credits.css	  --> Styles for Movie Credits
                  _lists.css	  --> Styles for Movies List
                  _details.css	  --> Styles for Movie Details
                  
      index.html        --> Layout file (the main html template file of the app)
      js/               --> javascript files
        app.js          --> the main application module
        controllers.js  --> application controllers
        services.js     --> custom angular services
      partials/         --> angular view partials (partial html templates)
        movie-detail.html
        overview.html
      dist/
          angular-movielist.js		--> Combined javascript files
          angular-movielist.min.js	--> Combined & minified javascript files
      
    test/               --> test source files and libraries
      unit/             --> unit level specs/tests
        controllersSpec.js --> specs for controllers
        appSpec.js  --> specs for app
        servicesSpec.js    --> specs for services


