'use strict';

var ARRAY_WIZARD_LENGTH = 4;

var firstName = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondName = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var clothesColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];
var userDialog = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = userDialog.querySelector('.setup-similar-list');

var getRandomElement = function (arg) {
  return arg[Math.floor(Math.random() * arg.length)];
};

for (var i = 0; i < ARRAY_WIZARD_LENGTH; i++) {
  wizards.push(
      {
        name: getRandomElement(firstName) + ' ' + getRandomElement(secondName),
        coatColor: getRandomElement(clothesColor),
        eyesColor: getRandomElement(eyesColor)
      }
  );
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;

};

var addElementsOnPage = function (arg) {
  var fragment = document.createDocumentFragment();

  for (i = 0; i < arg.length; i++) {
    fragment.appendChild(renderWizard(arg[i]));
  }

  return fragment;

};

similarListElement.appendChild(addElementsOnPage(wizards));
userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');
