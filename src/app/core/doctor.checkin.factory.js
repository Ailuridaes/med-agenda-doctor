(function() {
    'use strict';

    angular
        .module('app')
        .factory('doctorCheckInFactory', doctorCheckInFactory);

    doctorCheckInFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function doctorCheckInFactory($http, $q, apiUrl) {
        var service = {
            checkIn: checkIn,
            checkOut: checkOut,
            getActiveCheckIns: getActiveCheckIns
        };

        var doctorCheckInUrl = apiUrl + 'DoctorCheckIns';

        return service;

        function checkIn(doctorId) {
            var checkIn = { doctorId: doctorId }
            var defer = $q.defer();

            $http({
                method: 'POST',
                url: doctorCheckInUrl,
                data: checkIn
            }).then(
                function(res) {
                    defer.resolve(res.data);
                }, function(res) {
                    defer.reject(res);
                }
            );
            return defer.promise;
        }

        function checkOut(doctorId) {
            var defer = $q.defer();

            $http({
                method: 'PUT',
                url: doctorCheckInUrl + '/Checkout/' + doctorId,
                data: checkIn
            }).then(
                function(res) {
                    defer.resolve(res.data);
                }, function(res) {
                    defer.reject(res);
                }
            );
            return defer.promise;
        }

        function getActiveCheckIns() {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: doctorCheckInUrl + '/Active'
            }).then(
                function(res) {
                    defer.resolve(res.data);
                }, function(res) {
                    defer.reject(res);
                }
            );

            return defer.promise;
        }

    }
})();
