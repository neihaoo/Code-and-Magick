'use strict';
(function () {
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

  var onUserDialogLoad = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.numberOfWizards; i++) {
      fragment.appendChild(createWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
  };

  window.wizards = {
    onLoad: onUserDialogLoad
  };
})();
