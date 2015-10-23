(function() {
    var app = angular.module('task-bar', []);

    app.directive('taskBar', function() {
        return {
            restrict: 'E',
            template: 'Hi'
        };
    });
})();
