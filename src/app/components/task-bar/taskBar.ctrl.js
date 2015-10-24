(function() {
    var app = angular.module('taskBarController', ['taskBarService']);

    app.controller('taskBarController', ['$scope', 'taskBarService', function($scope, taskBarService) {
        var ctrl = this;

        ctrl.taskName = $scope.task;
        ctrl.subtaskName = $scope.subtask;

        ctrl.completion = {
            percentRemaining: 0,
            secondsRemaining: 30,
            secondsTotal: 30
        };

        taskBarService.registerForCompletionUpdates(ctrl.taskName, ctrl.subtaskName, function(completion) {
            ctrl.completion.percentRemaining = completion.percentRemaining;
            ctrl.completion.secondsRemaining = completion.secondsRemaining;
            ctrl.completion.secondsTotal = completion.secondsTotal;
            $scope.$apply();
        });
    }]);
})();
