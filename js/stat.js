'use strict';
(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_HEIGHT = 16;
  var TEXT_GAP = 20;
  var HISTOGRAM_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arg) {
    var maxElement = 0;

    for (var i = 0; i < arg.length; i++) {
      if (arg[i] > maxElement) {
        maxElement = arg[i];
      }
    }

    return maxElement;
  };

  var getRandomColor = function () {
    var redChannel = Math.floor(Math.random() * 128);
    var greenChannel = redChannel;
    var blueChannel = 255 - redChannel;

    return 'rgba(' + redChannel + ', ' + greenChannel + ', ' + blueChannel + ', 1)';
  };

  var renderWinnerMessage = function (ctx, font, color) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText('Ура вы победили!', CLOUD_X + BAR_GAP, CLOUD_Y + FONT_HEIGHT + GAP);
    ctx.fillText('Список результатов:', CLOUD_X + BAR_GAP, CLOUD_Y + FONT_HEIGHT + TEXT_GAP + GAP);
  };

  var renderHistogram = function (ctx, label, scale) {
    var maxScale = getMaxElement(scale);

    for (var i = 0; i < label.length; i++) {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillText(label[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - CLOUD_Y);
      ctx.fillText(Math.round(scale[i]), CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - (HISTOGRAM_HEIGHT * scale[i] / maxScale) - TEXT_GAP - GAP);
      ctx.fillStyle = label[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : getRandomColor();
      ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - (HISTOGRAM_HEIGHT * scale[i] / maxScale) - FONT_HEIGHT - GAP, BAR_WIDTH, (HISTOGRAM_HEIGHT * scale[i] / maxScale));
    }
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255, 1)');
    renderWinnerMessage(ctx, '16px PT Mono', 'rgba(0, 0, 0, 1)');
    renderHistogram(ctx, names, times);
  };
})();
