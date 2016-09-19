(function() {
    'use strict';

    angular
        .module('app')
        .controller('CheckInController', CheckInController);

    CheckInController.$inject = ['doctorCheckInFactory', '$state'];

    /* @ngInject */
    function CheckInController(doctorCheckInFactory, $state) {
        var vm = this;
        vm.title = 'CheckInController';
        vm.checkIn = checkIn;

        function checkIn(doctorId){
            doctorCheckInFactory.checkIn(doctorId).then(
                function(){
                    // $state.go()
                },
                function(error) {
                    //TODO: handle error
                }
            );
        }
    }
})();
