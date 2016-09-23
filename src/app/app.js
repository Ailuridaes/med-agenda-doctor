(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'angularMoment', 'toastr', 'ui.bootstrap'])

        .config(function($stateProvider, $urlRouterProvider){
        	$urlRouterProvider.otherwise('/doctor-list');

            	$stateProvider
            .state('doctot', {
                url: '/doctor',
                abstract: true,
                templateUrl: '/app/layout/admin.shell.html'                   
            })
                .state('checkIn', {
                    url: '/checkin',
                    templateUrl: '/app/checkin/checkin.html',
                    controller: 'CheckInController as checkIn'
                })
                .state('checkOut', {
                    url: '/checkout',
                    templateUrl: '/app/checkout/checkout.html',
                    controller: 'CheckOutController as checkOut'
                })

                .state('doctorList', {
                    url: '/doctor-list',
                    templateUrl: '/app/doctor-list/doctor-list.html',
                    controller: 'DoctorListController as doctorList'
                })

                .state('patientQueue', {
                    url: '/patient-queue/:doctorId',
                    templateUrl: '/app/patient-queue/patient-queue.html',
                    controller: 'PatientQueueController as patientQueue',
                    params: {
                        doctor: null
                    }
                })
                .state('patientDetail', {
                    url: '/patient-detail/:patientCheckInId',
                    templateUrl: '/app/patient-details/patient-detail.html',
                    controller: 'PatientDetailController as patientDetail'
                });

        });

})();
