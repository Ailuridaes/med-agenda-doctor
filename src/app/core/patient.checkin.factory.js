(function() {
    'use strict';

    angular
        .module('app')
        .factory('patientCheckInFactory', patientCheckInFactory);

    patientCheckInFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function patientCheckInFactory($http, $q, apiUrl) {
        var service = {
            getPatientCheckIn: getPatientCheckIn,
            getPatientQueue: getPatientQueue
        };

        var patientCheckInUrl = apiUrl + 'PatientCheckIns';

        return service;

        function getPatientCheckIn(patientCheckInId) {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: patientCheckInUrl + '/' + patientCheckInId
            }).then(
                function(res) {
                    defer.resolve(res.data);
                }, function(res) {
                    defer.reject(res);
                }
            );

            return defer.promise;
        }

        function getPatientQueue(doctorId) {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: patientCheckInUrl + '/Queue/' + (doctorId ? doctorId : '')
            }).then(
                function(res) {
                    defer.resolve(res.data);
                }, function(res) {
                    defer.reject(res);
                }
            );

            return defer.promise;
        }

        function checkOutPatient(patientCheckIn) {
            var defer = $q.defer();

            $http({
                method: 'PUT',
                url: patientCheckInUrl + '/' + patientCheckIn.patientCheckInId,
                data: patientCheckIn
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
