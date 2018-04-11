'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var ARRAY_WIZARD_LENGTH = 4;
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var CLOTHES_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');

var onModalWindowEscPress = function (evt) {
  return evt.keyCode === ESC_KEYCODE && document.activeElement !== userNameInput ? hideModalWindow() : userNameInput.blur();
};

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateWizardsData = function () {
  var wizards = [];

  for (var i = 0; i < ARRAY_WIZARD_LENGTH; i++) {
    wizards.push({
      name: getRandomElement(FIRST_NAMES) + ' ' + getRandomElement(SECOND_NAMES),
      coatColor: getRandomElement(CLOTHES_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
    });
  }

  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var addElementsOnPage = function (arg) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arg.length; i++) {
    fragment.appendChild(renderWizard(arg[i]));
  }

  return fragment;
};

var showModalWindow = function () {
  if (similarListElement.childElementCount < ARRAY_WIZARD_LENGTH) {
    similarListElement.appendChild(addElementsOnPage(generateWizardsData()));
  }
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onModalWindowEscPress);
};

var hideModalWindow = function () {
  document.removeEventListener('keydown', onModalWindowEscPress);
  userDialog.classList.add('hidden');
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
  wizardEyes.style.fill = getRandomElement(EYES_COLORS);
  userDialog.querySelector('input[name="eyes-color"]').value = wizardEyes.style.fill;
});

wizardFireball.addEventListener('click', function () {
  var fireballColor = getRandomElement(FIREBALLS_COLORS);

  wizardFireball.setAttribute('style', 'background-color: ' + fireballColor);
  userDialog.querySelector('input[name="fireball-color"]').value = fireballColor;
});
