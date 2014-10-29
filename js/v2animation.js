(function(window) {
  function randomNum(lowerbound, upperbound) {
    return Math.ceil(Math.random() * (upperbound - lowerbound)) + lowerbound;
  }

  function randomCord(sx, sy, w, h) {
    return {
      x: randomNum(sx, sx + w),
      y: randomNum(sy, sy + h)
    };
  }

  // core algorithm
  function getPointsForSquare(length, padding) {
    var sx, sy, w = padding, h = padding,
      result = [];
    for (sx = 0, sy = 0; sx + w <= length; sx += w) {
      result.push(randomCord(sx, sy, w, h));
    }
    for (sx = length - w, sy = h; sy + h <= length; sy += h) {
      result.push(randomCord(sx, sy, w, h));
    }
    for (sx = length - 2 * w, sy = length - h; sx >= 0; sx -= w) {
      result.push(randomCord(sx, sy, w, h));
    }
    for (sx = 0, sy = length - 2 * h; sy >= h; sy -= h) {
      result.push(randomCord(sx, sy, w, h));
    }
    return result;
  }

  function injectRule(rule) {
    var style = document.head.appendChild(document.createElement("style"));
    style.sheet.insertRule(rule, 0);
  }

  function randomPolygonDef() {
    var points = getPointsForSquare(300, 60).map(function(point) {
      return point.x + 'px ' + point.y + 'px';
    });
    var polygonDef = 'polygon(' + points.join(',') + ')';
    return polygonDef;
  }

  function v2animation() {
    var rule = '';
    for (var i = 0; i < 10; i ++) {
      rule += (i * 10) + '% { -webkit-clip-path:' + randomPolygonDef() + '}';
    }
    rule = ' v2animation {' + rule + '}';
    if (CSSRule.KEYFRAMES_RULE) { // W3C
      rule = '@keyframes' + rule;
    } else if (CSSRule.WEBKIT_KEYFRAMES_RULE) { // WebKit
      rule = '@-webkit-keyframes' + rule;
    }
    console.log(rule);
    injectRule(rule);
  }

  v2animation();
})(window);
