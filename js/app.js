'use strict';

angular.module('notes', ['navigation','highlightjs','notifications','notes.slide','notes.NotesService','notes.NotesModel'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/intro', {templateUrl: 'partials/slide1.html', controller:SlideController});
        $routeProvider.otherwise({redirectTo: '/intro'});

        //This one is not exactly a good practice but its the
        //only way to load routes asynchronously 
        window.routeProvider = $routeProvider;
        window.startHash = window.location.hash.substring(1);
    }])