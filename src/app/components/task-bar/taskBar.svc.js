(function() {
    var module = angular.module('taskBarService', []);

    module.factory('taskBarService', [function() {
        var callbacks = {};

        var seconds = 100;

        setInterval(function() {
            --seconds;

            if (seconds < 0) {
                seconds = 0;
            }

            callbacks.Amanda.Diaper.forEach(function (callback) {
                var ret = {
                    percentComplete: seconds / 100,
                    secondsRemaining: seconds,
                    secondsTotal: 100
                };

                callback(ret);
            });
        }, 1000);

        function addCallback(taskName, subtaskName, callback) {
            if (!callbacks[taskName]) {
                callbacks[taskName] = {};
            }

            if (!callbacks[taskName][subtaskName]) {
                callbacks[taskName][subtaskName] = [];
            }

            callbacks[taskName][subtaskName].push(callback);
        }

        return { 
            registerForCompletionUpdates: addCallback
        };
    }]);
})();
