// Factory Service
(function() {
  const SERVICES = angular.module('zen.services', []);

  SERVICES.factory('Api', function($http) {
    var getBreak = function(options) {
      var length = options.length.toLowerCase();
      var type = options.type.toLowerCase();
      return $http({
        method: 'GET',
        url: `/api/break?type=${type}&length=${length}`,
      }).then(function(resp) {
        return resp.data;
      });
    };

    var postSetting = function(day, startTime, endTime, breakType) {
      return $http({
        method: 'POST',
        url: '/api/users/settings',
        data: {
          day: day,
          startTime: startTime,
          endTime: endTime,
          breakType: breakType
        }
      });
    };

    var getSetting = function () {
      return $http({
        method: 'GET',
        url: '/api/users/settings'
      })
      .then(function (settingData) {
        console.log('Get setting data is :', settingData);
        return settingData.data;
      });
    };

    return {
      postSetting: postSetting,
      getSetting: getSetting,
      getBreak: getBreak
    };
  });

  SERVICES.factory('BroFactory', function() {
    var brotobase = [
      'camole',
      'mie',
      'seph',
      'sephenheim',
      'skillet',
      'tozoa',
      'tègè',
      'deo',
      'do Baggins',
      'hawk',
      'klahoma',
      'totype',
      'kemon',
      'metheus',
      'migo',
      'asaurus',
      '-rex',
      'sta Rica',
      'tocopter',
      'hemian Rhapsody',
      'zeman Bhrutana',
      'vakhiin',
      'mance',
      'mate',
      'ception',
      'manship',
      ' Man Chu',
      'aholic',
      'hammer',
      'dozer',
      'kini',
      'modo Dragon',
      'fessor',
      'sephina',
      'zilla',
      'kachu',
      'ey McBrosters',
      'nie Sanders'
    ];

    var getBro = function() {
      var randIndex = Math.floor(Math.random() * brotobase.length);
      return brotobase[randIndex];
    };

    return {
      getBro: getBro,
      brotobase: brotobase
    };
  });
})();
