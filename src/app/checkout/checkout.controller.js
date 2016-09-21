(function() {
    'use strict';

    angular
        .module('app')
        .controller('CheckOutController', CheckOutController);

    CheckOutController.$inject = ['doctorCheckInFactory', '$state', 'toastr'];

    /* @ngInject */
    function CheckOutController(doctorCheckInFactory, $state, toastr) {
        var vm = this;
        vm.title = 'CheckOutController';
        vm.checkOut = checkOut;

        function checkOut(doctorId){
            doctorCheckInFactory.checkOut(doctorId).then(
                function(){
                    toastr.success('Successfully logged out.', 'Success!');
                    $state.go('doctorList');
                },
                function(error) {
                    toastr.error(error.data.message, 'Error');
                }
            );
        }
    }
})();
