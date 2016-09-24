(function() {
    'use strict';

    angular
        .module('app')
        .controller('PatientDetailController', PatientDetailController)
        .filter('ageFilter', ageFilter);

        PatientDetailController.$inject = ['assignmentFactory', 'doctorFactory', 'patientCheckInFactory', '$q', '$state', '$stateParams', 'toastr'];


    /* @ngInject */
    function PatientDetailController(assignmentFactory, doctorFactory, patientCheckInFactory, $q, $state, $stateParams, toastr) {
        var vm = this;
        vm.title = 'PatientDetailController';
        vm.patient = {};
        vm.patientCheckIn = {};
        vm.doctor = {};
        vm.assignment = {};
        vm.getPatientCheckIn = getPatientCheckIn;
        vm.startAssignment = startAssignment;
        vm.endAssignment = endAssignment;

        activate();

        ////////////////

        function activate() {
            if($stateParams.doctor) {
                vm.doctor = $stateParams.doctor;
            } else if($stateParams.doctorId) {
                // navigation via url, need to GET doctor info
                doctorFactory.getDoctor($stateParams.doctorId).then(
                    function(doctor) {
                        vm.doctor = doctor;
                    }
                );
            }
            var patientCheckInId = $stateParams.patientCheckInId;
            getPatientCheckIn(patientCheckInId);

            // get assignment if it already exists
            assignmentFactory.getAssignment($stateParams.doctorId, patientCheckInId).then(
                function(data) {
                    vm.assignment = data;
                    // NOTE: if no assignment exists, data == []
                },
                function(res) {
                    toastr.error(error.data.message, 'Error');
                }
            );
        }

        function getPatientCheckIn(patientCheckInId) {
            patientCheckInFactory.getPatientCheckIn(patientCheckInId).then(
                function(data) {
                    vm.patientCheckIn = data;
                    // NOTE: Database rewrite -> DTOs may necessitate a GET patient or patientCheckIns call
                    vm.patient = data.patient;
                },
                function(error) {
                    toastr.error(error.data.message, 'Error');
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
