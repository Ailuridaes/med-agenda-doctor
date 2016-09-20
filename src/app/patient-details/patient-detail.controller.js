(function() {
    'use strict';

    angular
        .module('app')
        .controller('PatientDetailController', PatientDetailController)
        .filter('ageFilter', ageFilter);

    PatientDetailController.$inject = ['patientFactory'];

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
    function PatientDetailController(patientFactory) {
        var vm = this;
        vm.title = 'PatientDetailController';
        vm.patients = [];
        vm.getPatient = getPatient;


        activate();

        ////////////////

        function activate() {
            getPatient();

        }


        // this.calculateAge = function(birthday) { // pass in player.dateOfBirth
        //     var ageDifMs = Date.now() - new Date(birthday);
        //     var ageDate = new Date(ageDifMs); // miliseconds from epoch
        //     return Math.abs(ageDate.getUTCFullYear() - 1970);
        // };

        function getPatient() {

            patientFactory.getPatientList()
                .then(
                    function(data) {
                        vm.patients = data;
                        console.log(vm.students);
                    });
        }
    }
})();
