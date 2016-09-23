(function() {
    'use strict';

    angular
        .module('app')
        .controller('PatientDetailController', PatientDetailController)
        .filter('ageFilter', ageFilter);

        PatientDetailController.$inject = ['patientCheckInFactory', 'assignmentFactory', '$state', '$stateParams', 'toastr'];


    /* @ngInject */
    function PatientDetailController(patientCheckInFactory, assignmentFactory, $state, $stateParams, toastr) {
        var vm = this;
        vm.title = 'PatientDetailController';
        vm.patient = {};
        vm.patientCheckIn = {};
        vm.doctor;
        vm.assignment = {};
        vm.getPatientCheckIn = getPatientCheckIn;
        vm.startAssignment = startAssignment;
        vm.endAssignment = endAssignment;

        activate();

        ////////////////

        function activate() {
            vm.doctor = $stateParams.doctor;
            var patientCheckInId = $stateParams.patientCheckInId;
            getPatientCheckIn(patientCheckInId);
        }

        function getPatientCheckIn(patientCheckInId) {
            patientCheckInFactory.getPatientCheckIn(patientCheckInId)
            .then(
                function(data) {
                    vm.patientCheckIn = data;
                    // NOTE: Database rewrite -> DTOs may necessitate a GET patient or patientCheckIns call
                    vm.patient = data.patient;
                },
                function(error) {
                    //TODO: error handling
                }
            );
        }

        function startAssignment() {
            assignmentFactory.startAssignment(vm.doctor.doctorId, vm.patientCheckIn.patientCheckInId).then(
                function(data) {
                    vm.assignment = data;
                    toastr.success('Started assignment!');
                },
                function(error) {
                    toastr.error(error.data.message, 'Error');
                }
            );
        }

        function endAssignment() {
            var deferred = $q.defer();
            var promises = [];

            promises.push(assignmentFactory.endAssignment(vm.assignment));
            promises.push(patientCheckInFactory.checkOutPatient(vm.patientCheckIn));

            $q.all(promises).then(
                function(data) {
                    toastr.success('Assignment complete!');
                    $state.go('patientQueue, {doctorId: vm.doctor.doctorId, doctor: vm.doctor}');
                },
                function(error) {
                    toastr.error(error.data.message, 'Error');
                }
            );
        }


    }

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

})();
