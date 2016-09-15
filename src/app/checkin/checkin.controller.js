(function() {
    'use strict';

    angular
        .module('app')
        .controller('CheckInController', CheckInController);

    CheckInController.$inject = [];

    /* @ngInject */
    function CheckInController() {
        var vm = this;
        vm.title = 'CheckInController';
        vm.checkIn = checkIn;

        function checkIn(doctorId){
           

        }
    }
})();