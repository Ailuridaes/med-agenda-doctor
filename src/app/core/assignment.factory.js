(function() {
    'use strict';

    angular
        .module('app')
        .factory('assignmentFactory', assignmentFactory);

    assignmentFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function assignmentFactory($http, $q, apiUrl) {
        var service = {
            startAssignment: startAssignment,
            getAssignment: getAssignment,
            endAssignment: endAssignment,
            deleteAssignment: deleteAssignment
        };

        var assignmentUrl = apiUrl + 'assignments'

        return service;

        function startAssignment(doctorId, patientCheckInId) {
            var defer = $q.defer();

            $http({
                method: 'POST',
                url: assignmentUrl + '/' + doctorId + '/' + patientCheckInId
            }).then(
                function(res) {
                    defer.resolve(res.data);
                }, function(res) {
                    defer.reject(res);
                }
            );
            return defer.promise;
        }

        function getAssignment(doctorId, patientCheckInId) {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: assignmentUrl + '/' + doctorId + '/' + patientCheckInId
            }).then(
                function(res) {
                    defer.resolve(res.data);
                }, function(res) {
                    defer.reject(res);
                }
            );

            return defer.promise;
        }

        function endAssignment(assignment) {
            var defer = $q.defer();

            $http({
                method: 'PUT',
                url: assignmentUrl + '/end/' + assignment.doctorCheckInId + '/' + assignment.patientCheckInId,
                data: assignment
            }).then(
                function(res) {
                    defer.resolve();
                }, function(res) {
                    defer.reject(res.statusText);
                }
            );

            return defer.promise;
        }

        function deleteAssignment(data) {

            var defer = $q.defer();

            $http({
                method: 'DELETE',
                url: assignmentUrl + 'dataId'
            }).then(
                function(res) {
                    defer.resolve(res.data);
                }, function(res) {
                    defer.reject(res.statusText);
                }
            );

            return defer.promise;
        }
    }
})();
