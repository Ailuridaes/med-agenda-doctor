(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'angularMoment'])

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
                url: '/doctor-list',
                templateUrl: '/app/doctor-list/doctor-list.html',
                controller: 'DoctorListController as doctorList'
            })

            .state('patientQueue', {
                url: '/patient-queue/:doctorId',
                templateUrl: '/app/patient-queue/patient-queue.html',
                controller: 'PatientQueueController as patientQueue'
            })
            .state('patientDetail', {
                url: '/patient-detail/:patientCheckInId',
                templateUrl: '/app/patient-details/patient-detail.html',
                controller: 'PatientDetailController as patientDetail'
            })

            .state('checkOut', {
                url: '/checkout',
                templateUrl: '/app/checkout/checkout.html',
                controller: 'CheckOutController as checkOut'
            });
        });

})();
