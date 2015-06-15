import {} from 'babel-core/polyfill';
import {} from "./helpers";
import {Store} from "./store";
import {Model} from "./model";
import {Template} from "./template";
import {View} from "./view";
import {Controller} from "./controller";
import {pusher} from "./pusher";

/**
 * Sets up a brand new Todo list.
 *
 * @param {string} name The name of your new to do list.
 */
function Todo(name, cb) {
  this.storage = new Store(name, (r) => {
    this.model = new Model(this.storage);
    this.template = new Template();
    this.view = new View(this.template);
    this.controller = new Controller(this.model, this.view);
    cb(this);
  });
}

var todo = new Todo('todos-vanillajs', (todo) => {
  function setView() {
    todo.controller.setView(document.location.hash);
  }
  setView();
  $on(window, 'hashchange', setView);
});


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworker.js').then(pusher).catch(function(err) {
    // Не получилось зарегестрировать SW
    console.log('ServiceWorker registration failed: ', err);
  });
}
