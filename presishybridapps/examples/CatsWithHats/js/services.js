angular.module('starter.services', [])

.factory('Cats', function($http, $q) {
  var cats = [];
  
  return {
    load: function() {
      var deferred = $q.defer();
      
      $http.get('https://kittenapi.herokuapp.com/cats/hats/100')
        .then(function(res) {
          if (!cats.length) cats = res.data;
          deferred.resolve();
        });
      
      return deferred.promise;
    },
    all: function() {
      return cats;
    },
    get: function(catId) {
      var deferred = $q.defer();
      for (var i = 0; i < cats.length; i++) {
        var thisId = cats[i].id;
        if (thisId === catId) {
          deferred.resolve(cats[i]);
        }
      }
      
      return deferred.promise;
    }
  }
});
