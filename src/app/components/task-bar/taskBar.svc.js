(function() {
    var module = angular.module('taskBarService', []);

    module.factory('taskBarService', [function() {
        var callbacks = {};

        var totalSeconds = 30;
        var seconds = totalSeconds;

        setInterval(function() {
            --seconds;

            if (seconds < 0) {
                seconds = 0;
            }

            for (var task in callbacks) {
                if (callbacks.hasOwnProperty(task)) {
                    for (var subtask in callbacks[task]) {
                        if (callbacks[task].hasOwnProperty(subtask)) {

                            var subtaskCompletion = {
                                percentRemaining: 1.0 - (seconds / 30),
                                secondsRemaining: seconds,
                                secondsTotal: 30
                            };

                            for (var i = 0; i < callbacks[task][subtask].length; ++i) {
                                var callback = callbacks[task][subtask][i];

                                callback(subtaskCompletion);
                            }
                        }
                    }
                }
            }
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
