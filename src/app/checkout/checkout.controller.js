(function() {
    'use strict';

    angular
        .module('app')
        .controller('CheckOutController', CheckOutController);

    CheckOutController.$inject = ['$stateParams'];

    /* @ngInject */
    function CheckOutController($stateParams) {
        var vm = this;
        vm.title = 'CheckOutController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();