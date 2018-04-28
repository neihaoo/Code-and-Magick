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
  var wizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
  var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
  var form = userDialog.querySelector('.setup-wizard-form');

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
    window.backend.load(window.wizards.onLoad, window.utils.onError);
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
    userDialog.querySelector('.setup-similar-list').textContent = '';
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

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
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
    var eyesColor = window.utils.getRandomElement(window.data.eyesColors);

    window.wizards.onEyesChange(eyesColor);
    wizardEyes.setAttribute('style', 'fill: ' + eyesColor);
    userDialog.querySelector('input[name="eyes-color"]').setAttribute('value', eyesColor);
  });

  wizardCoat.addEventListener('click', function () {
    var coatColor = window.utils.getRandomElement(window.data.coatColors);

    window.wizards.onCoatChange(coatColor);
    wizardCoat.setAttribute('style', 'fill: ' + coatColor);
    userDialog.querySelector('input[name="coat-color"]').setAttribute('value', coatColor);
  });

  wizardFireball.addEventListener('click', function () {
    var fireballColor = window.utils.getRandomElement(window.data.fireballsColors);

    wizardFireball.setAttribute('style', 'background-color: ' + fireballColor);
    userDialog.querySelector('input[name="fireball-color"]').setAttribute('value', fireballColor);
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), function () {
      hideModalWindow();
    }, window.utils.onError);
  });
})();
