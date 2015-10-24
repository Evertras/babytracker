(function() {
    var app = angular.module('taskBar', []);

    app.directive('taskBar', function() {
        return {
            restrict: 'E',
            templateUrl: 'template/task-bar.html',
            scope: {
                'task': '@',
                'subtask': '@'
            },
            controller: 'taskBarController',
            controllerAs: 'vm'
        };
    });
})();
