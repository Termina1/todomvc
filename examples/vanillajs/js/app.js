/*global app, $on */
(function () {
  'use strict';

  /**
   * Sets up a brand new Todo list.
   *
   * @param {string} name The name of your new to do list.
   */
  function Todo(name, cb) {
    this.storage = new app.Store(name, function(r) {
      this.model = new app.Model(this.storage);
      this.template = new app.Template();
      this.view = new app.View(this.template);
      this.controller = new app.Controller(this.model, this.view);
      cb(this);
    }.bind(this));
  }

  var todo = new Todo('todos-vanillajs', function(todo) {
    function setView() {
      todo.controller.setView(document.location.hash);
    }
    setView();
    $on(window, 'hashchange', setView);
  });
})();
