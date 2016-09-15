(function() {
    'use strict';

    angular
        .module('app')
        .factory('doctorFactory', doctorFactory);

    doctorFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function doctorFactory($http, $q, apiUrl) {
        var service = {
            getDoctorList: getDoctorList,
            getDoctor: getDoctor
        };

        var doctorUrl = apiUrl + 'doctors';

        return service;

        function getDoctorList() {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: doctorUrl
            }).then(
                function(res) {
                    defer.resolve(res.data);
                }, function(res) {
                    defer.reject(res);
                }
            );

            return defer.promise;
        }

        function getDoctor(doctorId) {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: doctorUrl + '/' + doctorId
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