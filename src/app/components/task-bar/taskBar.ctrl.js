(function() {
    var app = angular.module('taskBarController', ['taskBarService']);

    app.controller('taskBarController', ['taskBarService', function(taskBarService) {
        var ctrl = this;

        ctrl.completion = taskBarService.getCompletion('Amanda', 'Diaper');
    }]);
})();
