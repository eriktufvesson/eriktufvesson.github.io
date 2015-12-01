angular.module('starter.controllers', [])

  .controller('CatsCtrl', function ($scope, Cats) {
    $scope.cats = Cats.all();
  })
  .controller('CatDetailCtrl', function ($scope, $window, cat) {
    if (cat && cat.url && cat.url.length) {
      $scope.cat = {
        url: cat.url,
        source_url: cat.source_url
      };
    }
    
    $scope.gotoSource = function() {
      $window.open($scope.cat.source_url, '_blank');
    };
  });
