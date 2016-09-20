(function() {
    'use strict';

    angular
        .module('app', ['ui.router'])

        .config(function($stateProvider, $urlRouterProvider){
        	$urlRouterProvider.otherwise('/feature');

        	$stateProvider
        	.state('feature', {
        		url: '/feature',
        		templateUrl: '/app/feature/feature.html',
        		controller: 'FeatureController as feature'
        	})

            .state('checkIn', {
                url: '/checkin',
                templateUrl: '/app/checkin/checkin.html',
                controller: 'CheckInController as checkIn'
            })

            .state('doctorList', {
                url: '/doctorlist',
                templateUrl: '/app/doctor-list/doctor-list.html',
                controller: 'DoctorListController as doctorList'
            })

            .state('patientDetail', {
                url: '/patientdetail',
                templateUrl: '/app/patient-details/patient-detail.html',
                controller: 'PatientDetailController as patientDetail'
            })

            .state('doctorCheckOut', {
                url: '/doctorcheckout',
                templateUrl: '/app/doctor-checkout/doctor-checkout.html',
                controller: 'DoctorCheckOutController as checkOut'
            });
        });

})();
