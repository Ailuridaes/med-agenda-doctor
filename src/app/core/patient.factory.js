(function() {
    'use strict';

    angular
        .module('app')
        .factory('patientFactory', patientFactory);

    patientFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function patientFactory($http, $q, apiUrl) {
        var service = {
            getPatientList: getPatientList,
            getPatient: getPatient
        };

        var patientUrl = apiUrl + 'patient';

        return service;

        function getPatientList() {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: patientUrl
            }).then(
                function(res) {
                    defer.resolve(res.data);
                }, function(res) {
                    defer.reject(res);
                }
            );

            return defer.promise;
        }

        function getPatient(patientId) {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: patientUrl + '/' + patientId
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
