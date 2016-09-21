(function() {
    'use strict';

    angular
        .module('app')
        .controller('CheckInController', CheckInController);

    CheckInController.$inject = ['doctorCheckInFactory', '$state', 'toastr'];

    /* @ngInject */
    function CheckInController(doctorCheckInFactory, $state, toastr) {
        var vm = this;
        vm.title = 'CheckInController';
        vm.checkIn = checkIn;

        function checkIn(doctorId){
            doctorCheckInFactory.checkIn(doctorId).then(
                function(){
                    toastr.success('Successfully logged in.', 'Success!');
                    $state.go('doctorList');
                },
                function(error) {
                    toastr.error(error.data.message, 'Error');
                }
            );
        }
    }
})();
