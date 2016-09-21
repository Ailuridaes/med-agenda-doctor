(function() {
    'use strict';

    angular
        .module('app')
        .controller('PatientQueueController', PatientQueueController);

    PatientQueueController.$inject = ['patientCheckInFactory', 'doctorFactory', '$stateParams'];

    /* @ngInject */
    function PatientQueueController(patientCheckInFactory, doctorFactory, $stateParams) {
        var vm = this;
        vm.title = 'PatientQueueController';
        vm.queue = [];
        vm.doctor = {};

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

        	patientCheckInFactory.getPatientQueue($stateParams.doctorId).then(
                function(queue) {
                    vm.queue = queue;
                },
                function(error) {
                    // TODO: Add error handling
                }
            );
        }

    }
})();
