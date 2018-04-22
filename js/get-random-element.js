'use strict';

(function () {
  window.getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };
})();

