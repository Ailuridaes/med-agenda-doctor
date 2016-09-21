(function() {
    'use strict';

    angular
        .module('app')
        .controller('DoctorListController', DoctorListController);

    DoctorListController.$inject = ['$q', 'doctorFactory', 'doctorCheckInFactory'];

    /* @ngInject */
    function DoctorListController($q, doctorFactory, doctorCheckInFactory) {
        var vm = this;
        vm.title = 'DoctorListController';
        vm.doctors = [];
        vm.checkIns = [];
        vm.getDoctors = getDoctors;



        activate();

        ////////////////

        function activate() {
            var deferred = $q.defer();
            var promises = [];

            promises.push(getDoctors());
            promises.push(getDoctorCheckIns());

            $q.all(promises).then(
                function() {
                    setDoctorStatuses();
                }
            );
        }

        function getDoctors() {
            return doctorFactory.getDoctorList()
            .then(
                function(data) {

                    vm.doctors = data;

                }
            );
		}

        function getDoctorCheckIns() {
            return doctorCheckInFactory.getActiveCheckIns().then(
                function(data) {
                    vm.checkIns = data;
                }
            )
        }

        function setDoctorStatuses() {
            for (var checkIn of vm.checkIns) {
                var index = vm.doctors.findIndex(function(doctor) {
                  return doctor.doctorId == checkIn.doctorId;
                });
                vm.doctors[index].checkInTime = checkIn.checkInTime;
            }
        }

	}
})();
