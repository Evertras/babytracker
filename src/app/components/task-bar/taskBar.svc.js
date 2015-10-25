(function() {
    var module = angular.module('taskBarService', []);

    module.factory('taskBarService', [function() {
        var callbacks = {};
        var targetTimes = {};

        var totalSeconds = 120;

        var updateInterval = 10;

        function updateCallbacks() {
            for (var task in callbacks) {
                if (callbacks.hasOwnProperty(task)) {
                    for (var subtask in callbacks[task]) {
                        if (callbacks[task].hasOwnProperty(subtask)) {
                            if (!targetTimes[task] || !targetTimes[task][subtask]) {
                                reset(task, subtask);
                            }

                            var seconds = targetTimes[task][subtask].diff(moment(), 'seconds', true);

                            if (seconds < 0) {
                                seconds = 0;
                            }

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
        }
        
        setInterval(updateCallbacks, updateInterval);

        function addCallback(taskName, subtaskName, callback) {
            if (!callbacks[taskName]) {
                callbacks[taskName] = {};
            }

            if (!callbacks[taskName][subtaskName]) {
                callbacks[taskName][subtaskName] = [];
            }

            callbacks[taskName][subtaskName].push(callback);
        }

        function reset(taskName, subtaskName) {
            if (!targetTimes[taskName]) {
                targetTimes[taskName] = {};
            }

            targetTimes[taskName][subtaskName] = moment().add(2, 'minutes');
        }

        return { 
            registerForCompletionUpdates: addCallback,
            reset: reset
        };
    }]);
})();
