'use strict';

(function () {
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedElement;

  shopElement.addEventListener('dragstart', function (evt) {
    draggedElement = evt.target.cloneNode(true);
    artifactsElement.setAttribute('style', 'outline: 2px dashed red');
  });

  shopElement.addEventListener('dragend', function () {
    artifactsElement.removeAttribute('style');
  });

  artifactsElement.addEventListener('dragstart', function (evt) {
    draggedElement = evt.target;
    artifactsElement.setAttribute('style', 'outline: 2px dashed red');
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    if (!evt.target.closest('.setup-artifacts-cell').firstChild) {
      evt.target.setAttribute('style', 'background-color: yellow');
    }
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();

    if (evt.target.closest('.setup-artifacts-cell').firstChild) {
      evt.dataTransfer.dropEffect = 'none';
    }
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.removeAttribute('style');
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.preventDefault();

    artifactsElement.removeAttribute('style');
    evt.target.removeAttribute('style');

    if (!evt.target.closest('.setup-artifacts-cell').firstChild) {
      evt.target.appendChild(draggedElement);
    }
  });

  artifactsElement.addEventListener('dragend', function () {
    artifactsElement.removeAttribute('style');
  });
})();
