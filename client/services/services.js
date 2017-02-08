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

  SERVICES.factory('Timer', function() {
    var twentyFiveMinutes = 1000 * 60 * 25;

    return {
      time: twentyFiveMinutes,
      endTime: 0,
      getTime: getTime,
      start: start,
      reset: reset
    }

    function getTime(active) {
      if (active) {
        var date = new Date();
        var now = date.getTime();

        this.time = this.endTime - now;
        return formatTime(this.time);
      }
      return formatTime(this.time);
    }


    function start() {
      var date = new Date();
      var now = date.getTime();
      return this.endTime = now + this.time;
    }

    function reset() {
      return this.time = twentyFiveMinutes;
    }

    function formatTime(milliseconds) {
      var minutes = Math.floor(milliseconds / (1000 * 60));
      var seconds = Math.round((milliseconds % (1000 * 60) / 1000), 0);
      return pad(minutes) + ':' + pad(seconds);
    }

    function pad(num) {
      return num.toString().length > 1 ? num : '0'.concat(String(num));
    }
  });

})();
