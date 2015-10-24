(function() {
    var app = angular.module('taskBar', []);

    app.directive('taskBar', function() {
        return {
            restrict: 'E',
            templateUrl: 'template/task-bar.html',
            scope: {},
            controller: 'taskBarController',
            controllerAs: 'vm'
        };
    });
})();
