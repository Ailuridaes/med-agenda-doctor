(function() {
    'use strict';

    angular
        .module('app')
        .controller('PatientQueueController', PatientQueueController);

    PatientQueueController.$inject = ['patientCheckInFactory', '$stateParams'];

    /* @ngInject */
    function PatientQueueController(patientCheckInFactory, $stateParams) {
        var vm = this;
        vm.title = 'PatientQueueController';
        vm.queue = [];
        // vm.getTimeElapsed = getTimeElapsed;

        activate();

        ////////////////

        function activate() {
            var doctorId = $stateParams.doctorId;
        	patientCheckInFactory.getPatientQueue(doctorId).then(
                function(queue) {
                    vm.queue = queue;
                },
                function(error) {
                    // TODO: Add error handling
                }
            );
        }

        // function getTimeElapsed(timeIn) {
        //     // return Date.now() - timeIn;
        //     var timeIn = Date.parse(timeIn);
        //     return Date.now() - timeIn;
        //
        // }

    }
})();