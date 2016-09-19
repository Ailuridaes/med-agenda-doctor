(function() {
    'use strict';

    angular
        .module('app')
        .controller('PatientDetailController', PatientDetailController);

    PatientDetailController.$inject = ['patientFactory'];

    /* @ngInject */
    function PatientDetailController(patientFactory) {
        var vm = this;
        vm.title = 'PatientDetailController';
        vm.patients =[];
        vm.getPatient =getPatient;

        activate();

        ////////////////

        function activate() {
        	getPatient();

        }

        function getPatient(){

        	patientFactory.getPatientDetails()
        	.then(
        		function(data){
        			vm.patients = data;
        			console.log(vm.students);
        		});
        }
    }
})();