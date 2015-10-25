(function() {
    var module = angular.module('taskBarService', []);

    module.factory('taskBarService', [function() {
        var callbacks = {};

        var totalSeconds = 120;
        var seconds = totalSeconds;

        setInterval(function() {
            seconds -= 0.01;

            if (seconds < 0) {
                seconds = 0;
            }

            for (var task in callbacks) {
                if (callbacks.hasOwnProperty(task)) {
                    for (var subtask in callbacks[task]) {
                        if (callbacks[task].hasOwnProperty(subtask)) {

                            var subtaskCompletion = {
                                percentRemaining: 1.0 - (seconds / totalSeconds),
                                secondsRemaining: seconds,
                                secondsTotal: totalSeconds
                            };

                            for (var i = 0; i < callbacks[task][subtask].length; ++i) {
                                var callback = callbacks[task][subtask][i];

                                callback(subtaskCompletion);
                            }
                        }
                    }
                }
            }
        }, 10);

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
