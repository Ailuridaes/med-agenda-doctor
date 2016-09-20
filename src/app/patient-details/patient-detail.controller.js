(function() {
    'use strict';

    angular
        .module('app')
        .controller('PatientDetailController', PatientDetailController)
        .filter('ageFilter', ageFilter);

    PatientDetailController.$inject = ['patientCheckInFactory', '$stateParams'];

    function ageFilter() {
        function calculateAge(birthday) { // birthday is a date
            var date = new Date(birthday);
            var ageDifMs = Date.now() - date.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        return function(birthdate) {
            return calculateAge(birthdate);
        };
    }

    /* @ngInject */
    function PatientDetailController(patientCheckInFactory, $stateParams) {
        var vm = this;
        vm.title = 'PatientDetailController';
        vm.getPatientCheckIn = getPatientCheckIn;
        vm.patientCheckIn = {};


        activate();

        ////////////////

        function activate() {
            var patientCheckInId = $stateParams.patientCheckInId;
            getPatientCheckIn(patientCheckInId);

        }

        function getPatientCheckIn(patientCheckInId) {
            patientCheckInFactory.getPatientCheckIn(patientCheckInId)
                .then(
                    function(data) {
                        vm.patientCheckIn = data;
                    });
        }
    }
})();
