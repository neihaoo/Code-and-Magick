'use strict';

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

var getMaxElement = function (arr) {
  var maxElement = 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomColor = function () {
  var r = Math.floor(Math.random() * 128);
  var g = r;
  var b = 255 - r;
  return 'rgba(' + r + ', ' + g + ', ' + b + ', 1)';
};

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + BAR_GAP, CLOUD_Y + FONT_HEIGHT + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + BAR_GAP, CLOUD_Y + FONT_HEIGHT + TEXT_GAP + GAP);

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - CLOUD_Y);
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - (HISTOGRAM_HEIGHT * times[i] / maxTime) - TEXT_GAP - GAP);
  }

  for (i = 0; i < names.length; i++) {
    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : getRandomColor();
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - (HISTOGRAM_HEIGHT * times[i] / maxTime) - FONT_HEIGHT - GAP, BAR_WIDTH, (HISTOGRAM_HEIGHT * times[i] / maxTime));
  }
};
