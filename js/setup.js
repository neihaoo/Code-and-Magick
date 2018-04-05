'use strict';

var ARRAY_WIZARD_LENGTH = 4;
var FIRST_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var CLOTHES_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = userDialog.querySelector('.setup-similar-list');

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateWizardsData = function () {
  var wizards = [];

  for (var i = 0; i < ARRAY_WIZARD_LENGTH; i++) {
    wizards.push(
      {
        name: getRandomElement(FIRST_NAME) + ' ' + getRandomElement(SECOND_NAME),
        coatColor: getRandomElement(CLOTHES_COLOR),
        eyesColor: getRandomElement(EYES_COLOR)
      }
    );
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
  similarListElement.appendChild(addElementsOnPage(generateWizardsData()));
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
  userDialog.classList.remove('hidden');
};

showModalWindow();
