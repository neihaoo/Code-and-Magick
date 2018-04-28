'use strict';
(function () {
  var coatColor;
  var eyesColor;

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content.querySelector('.setup-similar-item');

  var createWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    similarListElement.textContent = '';

    for (var i = 0; i < window.data.numberOfWizards; i++) {
      fragment.appendChild(createWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
  };

  var updateWizards = function () {
    renderWizards(window.data.wizards.sort(function (a, b) {
      var rankDiff = getRank(b) - getRank(a);
      if (rankDiff === 0) {
        rankDiff = window.utils.compare(a.name, b.name);
      }
      return rankDiff;
    }));
  };

  var onEyesChange = function (color) {
    eyesColor = color;
    window.utils.debounce(updateWizards, 300);
  };

  var onCoatChange = function (color) {
    coatColor = color;
    window.utils.debounce(updateWizards, 300);
  };

  var onDialodLoad = function (data) {
    window.data.wizards = data;
    updateWizards();
  };

  window.wizards = {
    onLoad: onDialodLoad,
    onEyesChange: onEyesChange,
    onCoatChange: onCoatChange
  };
})();
