'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var userDialog = document.querySelector('.setup');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userAvatar = userDialog.querySelector('.setup-user-pic');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');

  var onModalWindowEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (evt.target.className !== 'setup-user-name') {
        hideModalWindow();
      } else {
        userNameInput.blur();
      }
    }
  };

  var showModalWindow = function () {
    window.renderWizards();
    userAvatar.setAttribute('style', 'z-index: 1');
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onModalWindowEscPress);
  };

  var hideModalWindow = function () {
    document.removeEventListener('keydown', onModalWindowEscPress);
    userDialog.classList.add('hidden');
    userDialog.removeAttribute('style');
    userDialog.querySelector('.setup-similar').classList.add('hidden');
  };

  userDialogOpen.addEventListener('click', function () {
    if (userDialog.classList.contains('hidden')) {
      showModalWindow();
    }
  });

  userDialogOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE && userDialog.classList.contains('hidden')) {
      showModalWindow();
    }
  });

  userDialogClose.addEventListener('click', function () {
    hideModalWindow();
  });

  userDialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      hideModalWindow();
    }
  });

  userAvatar.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.setAttribute('style', 'top: ' + (userDialog.offsetTop - shift.y) + 'px');
      userDialog.setAttribute('style', 'left: ' + (userDialog.offsetTop - shift.x) + 'px');
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;

    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

  wizardEyes.addEventListener('click', function () {
    wizardEyes.setAttribute('style', 'fill: ' + window.getRandomElement(window.data.eyesColors));
    userDialog.querySelector('input[name="eyes-color"]').setAttribute('value', wizardEyes.style.fill);
  });

  wizardFireball.addEventListener('click', function () {
    var fireballColor = window.getRandomElement(window.data.fireballsColors);

    wizardFireball.setAttribute('style', 'background-color: ' + fireballColor);
    userDialog.querySelector('input[name="fireball-color"]').setAttribute('value', fireballColor);
  });
})();
