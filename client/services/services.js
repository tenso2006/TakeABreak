// Factory Service
(function() {
  const SERVICES = angular.module('zen.services', []);

  SERVICES.factory('GetBreak', function($http) {
    var getBreak = function(callback) {
      return $http({
        method: 'GET',
        url: '/api/break',
      }).then(function(Break) {
        console.log('Here is a break: ', Break.data[0]);
        return Break.data[0];
      });
    };

    return {
      get: getBreak,
    };
  });

})();
