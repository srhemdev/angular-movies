'use strict';

describe('Movies service', function() {

  // load modules
  beforeEach(module('movieApp'));

  // Test service availability
  it('check the existence of Movies factory', inject(function(Movies) {
      expect(Movies).toBeDefined();
    }));
});