(function() {
    var app = angular.module('taskBarController', ['taskBarService']);

    app.controller('taskBarController', ['$scope', 'taskBarService', function($scope, taskBarService) {
        var ctrl = this;

        ctrl.taskName = $scope.task;
        ctrl.subtaskName = $scope.subtask;

        ctrl.completion = {
            percentComplete: 0,
            secondsRemaining: 100,
            secondsTotal: 100
        };

        taskBarService.registerForCompletionUpdates(ctrl.taskName, ctrl.subtaskName, function(completion) {
            ctrl.completion.percentComplete = completion.percentComplete;
            ctrl.completion.secondsRemaining = completion.secondsRemaining;
            ctrl.completion.secondsTotal = completion.secondsTotal;
            $scope.$apply();
        });
    }]);
})();
