(function() {
    'use strict';

    angular
        .module('app')
        .controller('DoctorListController', DoctorListController);

    DoctorListController.$inject = ['doctorFactory'];

    /* @ngInject */
    function DoctorListController(doctorFactory) {
        var vm = this;
        vm.title = 'DoctorListController';
        vm.doctors = [];
        vm.getDoctors = getDoctors;



        activate();

        ////////////////

        function activate() {
            getDoctors();
        }

        function getDoctors() {
            doctorFactory.getDoctorList()
            .then(
                function(data) {

                    vm.doctors = data;
                    console.log(vm.doctors);

                }
            );
		}

	}
})();
