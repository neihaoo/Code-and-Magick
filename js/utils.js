'use strict';

(function () {
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
    onError: onUserDialogError,
    getRandomElement: getRandomElement,
    shuffleElements: shuffleElements
  };
})();

