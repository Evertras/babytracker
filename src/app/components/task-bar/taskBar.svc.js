(function() {
    var module = angular.module('taskBarService', []);

    module.service('taskBarService', [function() {
        var svc = this;

        svc.getCompletion = function(taskName, subtaskName) {
            return {
                percentComplete: 0.8,
                secondsRemaining: 20,
                secondsTotal: 100
            };
        };
    }]);
})();
