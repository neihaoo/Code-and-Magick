'use strict';

(function () {
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

  var generateWizardsData = function () {
    var wizards = [];

    for (var i = 0; i < ARRAY_WIZARD_LENGTH; i++) {
      wizards.push({
        name: window.getRandomElement(FIRST_NAMES) + ' ' + window.getRandomElement(SECOND_NAMES),
        coatColor: window.getRandomElement(CLOTHES_COLORS),
        eyesColor: window.getRandomElement(EYES_COLORS)
      });
    }

    return wizards;
  };

  window.data = {
    numberOfWizards: ARRAY_WIZARD_LENGTH,
    eyesColors: EYES_COLORS,
    fireballsColors: FIREBALLS_COLORS,
    wizardsData: generateWizardsData
  };
})();

