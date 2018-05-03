'use strict';
(function () {
  var coatColor;
  var eyesColor;
  var currentElement;

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

  var onWizardHover = function (target) {
    for (var i = 0; i < window.data.wizards.length; i++) {
      if (window.data.wizards[i].name === target) {
        renderArtifacts(window.data.wizards[i].artifacts);

        break;
      }
    }
  };

  var creatArtifacts = function (artefact) {
    var artifactList = document.createElement('dl');
    var artifactName = document.createElement('dt');
    var artifactDescription = document.createElement('dd');

    artifactName.textContent = artefact.name;
    artifactName.setAttribute('style', 'font-size: smaller;');
    artifactDescription.textContent = artefact.description;
    artifactDescription.setAttribute('style', 'font-size: small;');
    artifactList.appendChild(artifactName);
    artifactList.appendChild(artifactDescription);

    return artifactList;
  };

  var renderArtifacts = function (artefacts) {
    var fragment = document.createDocumentFragment();
    var wizardArtifacts = document.createElement('div');

    for (var i = 0; i < artefacts.length; i++) {
      fragment.appendChild(creatArtifacts(artefacts[i]));
    }

    wizardArtifacts.setAttribute('style', 'color: white; position: absolute; background: #414342; bottom: 385px; width: 760px; padding: 0 20px;');
    wizardArtifacts.appendChild(fragment);
    document.querySelector('.setup').appendChild(wizardArtifacts);
  };

  similarListElement.addEventListener('mouseover', function (evt) {
    if (evt.target.className !== 'setup-similar-content') {
      return;
    }

    var target = evt.target;

    if (currentElement) {
      return;
    }
    while (target !== similarListElement) {
      if (target.className === 'setup-similar-content') {
        break;
      }

      target = target.parentNode;
    }
    if (target === similarListElement) {
      return;
    }

    onWizardHover(evt.target.parentElement.lastElementChild.textContent);
    currentElement = target;
  });

  similarListElement.addEventListener('mouseout', function (evt) {
    var relatedTarget = evt.relatedTarget;

    if (!currentElement) {
      return;
    }
    if (relatedTarget) {
      while (relatedTarget) {
        if (relatedTarget === currentElement) {
          return;
        }

        relatedTarget = relatedTarget.parentNode;
      }
    }

    currentElement = null;
    document.querySelector('.setup').removeChild(document.querySelector('.setup').lastChild);
  });

  window.wizards = {
    onLoad: onDialodLoad,
    onEyesChange: onEyesChange,
    onCoatChange: onCoatChange
  };
})();
