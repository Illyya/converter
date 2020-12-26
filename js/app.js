'use strict';

(function () {
  function init() {
    var router = new Router([
      new Route('converter', 'converter.html', true),
      new Route('current-rate', 'current-rate.html')
    ]);
  }
  init();
}());
