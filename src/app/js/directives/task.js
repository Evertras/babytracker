(function() {
    var app = angular.module('task', []);

    app.directive('task', function() {
        return {
            restrict: 'E',
            templateUrl: 'template/task.html'
        };
    });
})();
