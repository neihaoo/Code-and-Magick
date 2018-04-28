'use strict';

(function () {
  var lastTimeout;

  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var shuffleElements = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
  };

  var compareStrings = function (a, b) {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  };

  var debounce = function (fun, timeout) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(fun, timeout);
  };

  var onUserDialogError = function (errorMessage) {
    var node = document.createElement('div');

    node.textContent = errorMessage;
    node.setAttribute('style', 'z-index: 100; background-color: red; position: fixed; top: 0; width: 100%; text-align: center; padding: 5px');
    document.body.appendChild(node);

    setTimeout(function () {
      node.parentNode.removeChild(node);
    }, 3000);
  };

  window.utils = {
    debounce: debounce,
    onError: onUserDialogError,
    getRandomElement: getRandomElement,
    shuffleElements: shuffleElements,
    compare: compareStrings
  };
})();

