/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(3);

	var _store = __webpack_require__(4);

	var _model = __webpack_require__(5);

	var _template = __webpack_require__(2);

	var _view = __webpack_require__(6);

	var _controller = __webpack_require__(7);

	/**
	 * Sets up a brand new Todo list.
	 *
	 * @param {string} name The name of your new to do list.
	 */
	function Todo(name, cb) {
	  var _this = this;

	  this.storage = new _store.Store(name, function (r) {
	    _this.model = new _model.Model(_this.storage);
	    _this.template = new _template.Template();
	    _this.view = new _view.View(_this.template);
	    _this.controller = new _controller.Controller(_this.model, _this.view);
	    cb(_this);
	  });
	}

	var todo = new Todo("todos-vanillajs", function (todo) {
	  function setView() {
	    todo.controller.setView(document.location.hash);
	  }
	  setView();
	  $on(window, "hashchange", setView);
	});

	if ("serviceWorker" in navigator) {
	  navigator.serviceWorker.register("/serviceworker.js").then(function (registration) {
	    // Регистрация SW прошла успешно
	    console.log("ServiceWorker registration successful with scope: ", registration.scope);
	  })["catch"](function (err) {
	    // Не получилось зарегестрировать SW
	    console.log("ServiceWorker registration failed: ", err);
	  });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.Template = Template;
	var htmlEscapes = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  '\'': '&#x27;',
	  '`': '&#x60;'
	};

	var escapeHtmlChar = function escapeHtmlChar(chr) {
	  return htmlEscapes[chr];
	};

	var reUnescapedHtml = /[&<>"'`]/g,
	    reHasUnescapedHtml = new RegExp(reUnescapedHtml.source);

	var escape = function escape(string) {
	  return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
	};

	/**
	 * Sets up defaults for all the Template methods such as a default template
	 *
	 * @constructor
	 */

	function Template() {
	  this.defaultTemplate = '<li data-id="{{id}}" class="{{completed}}">' + '<div class="view">' + '<input class="toggle" type="checkbox" {{checked}}>' + '<label>{{title}}</label>' + '<button class="destroy"></button>' + '</div>' + '</li>';
	}

	/**
	 * Creates an <li> HTML string and returns it for placement in your app.
	 *
	 * NOTE: In real life you should be using a templating engine such as Mustache
	 * or Handlebars, however, this is a vanilla JS example.
	 *
	 * @param {object} data The object containing keys you want to find in the
	 *                      template to replace.
	 * @returns {string} HTML String of an <li> element
	 *
	 * @example
	 * view.show({
	 *	id: 1,
	 *	title: "Hello World",
	 *	completed: 0,
	 * });
	 */
	Template.prototype.show = function (data) {
	  var i, l;
	  var view = '';

	  for (i = 0, l = data.length; i < l; i++) {
	    var template = this.defaultTemplate;
	    var completed = '';
	    var checked = '';

	    if (data[i].completed) {
	      completed = 'completed';
	      checked = 'checked';
	    }

	    template = template.replace('{{id}}', data[i].id);
	    template = template.replace('{{title}}', escape(data[i].title));
	    template = template.replace('{{completed}}', completed);
	    template = template.replace('{{checked}}', checked);

	    view = view + template;
	  }

	  return view;
	};

	/**
	 * Displays a counter of how many to dos are left to complete
	 *
	 * @param {number} activeTodos The number of active todos.
	 * @returns {string} String containing the count
	 */
	Template.prototype.itemCounter = function (activeTodos) {
	  var plural = activeTodos === 1 ? '' : 's';

	  return '<strong>' + activeTodos + '</strong> item' + plural + ' left';
	};

	/**
	 * Updates the text within the "Clear completed" button
	 *
	 * @param  {[type]} completedTodos The number of completed todos.
	 * @returns {string} String containing the count
	 */
	Template.prototype.clearCompletedButton = function (completedTodos) {
	  if (completedTodos > 0) {
	    return 'Clear completed';
	  } else {
	    return '';
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// Get element(s) by CSS selector:
	'use strict';

	window.qs = function (selector, scope) {
	  return (scope || document).querySelector(selector);
	};
	window.qsa = function (selector, scope) {
	  return (scope || document).querySelectorAll(selector);
	};

	// addEventListener wrapper:
	window.$on = function (target, type, callback, useCapture) {
	  target.addEventListener(type, callback, !!useCapture);
	};

	// Attach a handler to event for all elements that match the selector,
	// now or in the future, based on a root element
	window.$delegate = function (target, selector, type, handler) {
	  function dispatchEvent(event) {
	    var targetElement = event.target;
	    var potentialElements = window.qsa(selector, target);
	    var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

	    if (hasMatch) {
	      handler.call(targetElement, event);
	    }
	  }

	  // https://developer.mozilla.org/en-US/docs/Web/Events/blur
	  var useCapture = type === 'blur' || type === 'focus';

	  window.$on(target, type, dispatchEvent, useCapture);
	};

	// Find the element's parent with the given tag name:
	// $parent(qs('a'), 'div');
	window.$parent = function (element, tagName) {
	  if (!element.parentNode) {
	    return;
	  }
	  if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
	    return element.parentNode;
	  }
	  return window.$parent(element.parentNode, tagName);
	};

	// Allow for looping on nodes by chaining:
	// qsa('.foo').forEach(function () {})
	NodeList.prototype.forEach = Array.prototype.forEach;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Creates a new client side storage object and will create an empty
	 * collection if no collection already exists.
	 *
	 * @param {string} name The name of our DB we want to use
	 * @param {function} callback Our fake DB uses callbacks because in
	 * real life you probably would be making AJAX calls
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.Store = Store;

	function Store(name, callback) {
	  callback = callback || function () {};
	  this.data = [];
	  fetch('/get').then(function (r) {
	    return r.json();
	  }).then((function (r) {
	    this.data = r;
	    callback(this.data);
	  }).bind(this));
	}

	/**
	 * Finds items based on a query given as a JS object
	 *
	 * @param {object} query The query to match against (i.e. {foo: 'bar'})
	 * @param {function} callback	 The callback to fire when the query has
	 * completed running
	 *
	 * @example
	 * db.find({foo: 'bar', hello: 'world'}, function (data) {
	 *	 // data will return any items that have foo: bar and
	 *	 // hello: world in their properties
	 * });
	 */
	Store.prototype.find = function (query, callback) {
	  if (!callback) {
	    return;
	  }

	  var todos = this.data;

	  callback.call(this, todos.filter(function (todo) {
	    for (var q in query) {
	      if (query[q] !== todo[q]) {
	        return false;
	      }
	    }
	    return true;
	  }));
	};

	/**
	 * Will retrieve all data from the collection
	 *
	 * @param {function} callback The callback to fire upon retrieving data
	 */
	Store.prototype.findAll = function (callback) {
	  callback = callback || function () {};
	  callback.call(this, this.data);
	};

	Store.prototype.send = function () {
	  fetch('/set', {
	    method: 'post',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(this.data)
	  });
	};

	/**
	 * Will save the given data to the DB. If no item exists it will create a new
	 * item, otherwise it'll simply update an existing item's properties
	 *
	 * @param {object} updateData The data to save back into the DB
	 * @param {function} callback The callback to fire after saving
	 * @param {number} id An optional param to enter an ID of an item to update
	 */
	Store.prototype.save = function (updateData, callback, id) {
	  var todos = this.data;

	  callback = callback || function () {};

	  // If an ID was actually given, find the item and update each property
	  if (id) {
	    for (var i = 0; i < todos.length; i++) {
	      if (todos[i].id === id) {
	        for (var key in updateData) {
	          todos[i][key] = updateData[key];
	        }
	        break;
	      }
	    }

	    this.data = todos;
	    callback.call(this, this.data);
	  } else {
	    // Generate an ID
	    updateData.id = new Date().getTime();

	    todos.push(updateData);
	    this.data = todos;
	    callback.call(this, [updateData]);
	  }
	  this.send();
	};

	/**
	 * Will remove an item from the Store based on its ID
	 *
	 * @param {number} id The ID of the item you want to remove
	 * @param {function} callback The callback to fire after saving
	 */
	Store.prototype.remove = function (id, callback) {
	  var todos = this.data;

	  for (var i = 0; i < todos.length; i++) {
	    if (todos[i].id == id) {
	      todos.splice(i, 1);
	      break;
	    }
	  }

	  this.data = todos;
	  this.send();
	  callback.call(this, this.data);
	};

	/**
	 * Will drop all storage and start fresh
	 *
	 * @param {function} callback The callback to fire after dropping the data
	 */
	Store.prototype.drop = function (callback) {
	  this.data = [];
	  this.send();
	  callback.call(this, this.data);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Creates a new Model instance and hooks up the storage.
	 *
	 * @constructor
	 * @param {object} storage A reference to the client side storage class
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.Model = Model;

	function Model(storage) {
	  this.storage = storage;
	}

	/**
	 * Creates a new todo model
	 *
	 * @param {string} [title] The title of the task
	 * @param {function} [callback] The callback to fire after the model is created
	 */
	Model.prototype.create = function (title, callback) {
	  title = title || '';
	  callback = callback || function () {};

	  var newItem = {
	    title: title.trim(),
	    completed: false
	  };

	  this.storage.save(newItem, callback);
	};

	/**
	 * Finds and returns a model in storage. If no query is given it'll simply
	 * return everything. If you pass in a string or number it'll look that up as
	 * the ID of the model to find. Lastly, you can pass it an object to match
	 * against.
	 *
	 * @param {string|number|object} [query] A query to match models against
	 * @param {function} [callback] The callback to fire after the model is found
	 *
	 * @example
	 * model.read(1, func); // Will find the model with an ID of 1
	 * model.read('1'); // Same as above
	 * //Below will find a model with foo equalling bar and hello equalling world.
	 * model.read({ foo: 'bar', hello: 'world' });
	 */
	Model.prototype.read = function (query, callback) {
	  var queryType = typeof query;
	  callback = callback || function () {};

	  if (queryType === 'function') {
	    callback = query;
	    return this.storage.findAll(callback);
	  } else if (queryType === 'string' || queryType === 'number') {
	    query = parseInt(query, 10);
	    this.storage.find({ id: query }, callback);
	  } else {
	    this.storage.find(query, callback);
	  }
	};

	/**
	 * Updates a model by giving it an ID, data to update, and a callback to fire when
	 * the update is complete.
	 *
	 * @param {number} id The id of the model to update
	 * @param {object} data The properties to update and their new value
	 * @param {function} callback The callback to fire when the update is complete.
	 */
	Model.prototype.update = function (id, data, callback) {
	  this.storage.save(data, callback, id);
	};

	/**
	 * Removes a model from storage
	 *
	 * @param {number} id The ID of the model to remove
	 * @param {function} callback The callback to fire when the removal is complete.
	 */
	Model.prototype.remove = function (id, callback) {
	  this.storage.remove(id, callback);
	};

	/**
	 * WARNING: Will remove ALL data from storage.
	 *
	 * @param {function} callback The callback to fire when the storage is wiped.
	 */
	Model.prototype.removeAll = function (callback) {
	  this.storage.drop(callback);
	};

	/**
	 * Returns a count of all todos
	 */
	Model.prototype.getCount = function (callback) {
	  var todos = {
	    active: 0,
	    completed: 0,
	    total: 0
	  };

	  this.storage.findAll(function (data) {
	    data.forEach(function (todo) {
	      if (todo.completed) {
	        todos.completed++;
	      } else {
	        todos.active++;
	      }

	      todos.total++;
	    });
	    callback(todos);
	  });
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	

	/**
	 * View that abstracts away the browser's DOM completely.
	 * It has two simple entry points:
	 *
	 *   - bind(eventName, handler)
	 *     Takes a todo application event and registers the handler
	 *   - render(command, parameterObject)
	 *     Renders the given command with the options
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.View = View;

	function View(template) {
	    this.template = template;

	    this.ENTER_KEY = 13;
	    this.ESCAPE_KEY = 27;

	    this.$todoList = qs('#todo-list');
	    this.$todoItemCounter = qs('#todo-count');
	    this.$clearCompleted = qs('#clear-completed');
	    this.$main = qs('#main');
	    this.$footer = qs('#footer');
	    this.$toggleAll = qs('#toggle-all');
	    this.$newTodo = qs('#new-todo');
	}

	View.prototype._removeItem = function (id) {
	    var elem = qs('[data-id="' + id + '"]');

	    if (elem) {
	        this.$todoList.removeChild(elem);
	    }
	};

	View.prototype._clearCompletedButton = function (completedCount, visible) {
	    this.$clearCompleted.innerHTML = this.template.clearCompletedButton(completedCount);
	    this.$clearCompleted.style.display = visible ? 'block' : 'none';
	};

	View.prototype._setFilter = function (currentPage) {
	    qs('#filters .selected').className = '';
	    qs('#filters [href="#/' + currentPage + '"]').className = 'selected';
	};

	View.prototype._elementComplete = function (id, completed) {
	    var listItem = qs('[data-id="' + id + '"]');

	    if (!listItem) {
	        return;
	    }

	    listItem.className = completed ? 'completed' : '';

	    // In case it was toggled from an event and not by clicking the checkbox
	    qs('input', listItem).checked = completed;
	};

	View.prototype._editItem = function (id, title) {
	    var listItem = qs('[data-id="' + id + '"]');

	    if (!listItem) {
	        return;
	    }

	    listItem.className = listItem.className + ' editing';

	    var input = document.createElement('input');
	    input.className = 'edit';

	    listItem.appendChild(input);
	    input.focus();
	    input.value = title;
	};

	View.prototype._editItemDone = function (id, title) {
	    var listItem = qs('[data-id="' + id + '"]');

	    if (!listItem) {
	        return;
	    }

	    var input = qs('input.edit', listItem);
	    listItem.removeChild(input);

	    listItem.className = listItem.className.replace('editing', '');

	    qsa('label', listItem).forEach(function (label) {
	        label.textContent = title;
	    });
	};

	View.prototype.render = function (viewCmd, parameter) {
	    var that = this;
	    var viewCommands = {
	        showEntries: function showEntries() {
	            that.$todoList.innerHTML = that.template.show(parameter);
	        },
	        removeItem: function removeItem() {
	            that._removeItem(parameter);
	        },
	        updateElementCount: function updateElementCount() {
	            that.$todoItemCounter.innerHTML = that.template.itemCounter(parameter);
	        },
	        clearCompletedButton: function clearCompletedButton() {
	            that._clearCompletedButton(parameter.completed, parameter.visible);
	        },
	        contentBlockVisibility: function contentBlockVisibility() {
	            that.$main.style.display = that.$footer.style.display = parameter.visible ? 'block' : 'none';
	        },
	        toggleAll: function toggleAll() {
	            that.$toggleAll.checked = parameter.checked;
	        },
	        setFilter: function setFilter() {
	            that._setFilter(parameter);
	        },
	        clearNewTodo: function clearNewTodo() {
	            that.$newTodo.value = '';
	        },
	        elementComplete: function elementComplete() {
	            that._elementComplete(parameter.id, parameter.completed);
	        },
	        editItem: function editItem() {
	            that._editItem(parameter.id, parameter.title);
	        },
	        editItemDone: function editItemDone() {
	            that._editItemDone(parameter.id, parameter.title);
	        }
	    };

	    viewCommands[viewCmd]();
	};

	View.prototype._itemId = function (element) {
	    var li = $parent(element, 'li');
	    return parseInt(li.dataset.id, 10);
	};

	View.prototype._bindItemEditDone = function (handler) {
	    var that = this;
	    $delegate(that.$todoList, 'li .edit', 'blur', function () {
	        if (!this.dataset.iscanceled) {
	            handler({
	                id: that._itemId(this),
	                title: this.value
	            });
	        }
	    });

	    $delegate(that.$todoList, 'li .edit', 'keypress', function (event) {
	        if (event.keyCode === that.ENTER_KEY) {
	            // Remove the cursor from the input when you hit enter just like if it
	            // were a real form
	            this.blur();
	        }
	    });
	};

	View.prototype._bindItemEditCancel = function (handler) {
	    var that = this;
	    $delegate(that.$todoList, 'li .edit', 'keyup', function (event) {
	        if (event.keyCode === that.ESCAPE_KEY) {
	            this.dataset.iscanceled = true;
	            this.blur();

	            handler({ id: that._itemId(this) });
	        }
	    });
	};

	View.prototype.bind = function (event, handler) {
	    var that = this;
	    if (event === 'newTodo') {
	        $on(that.$newTodo, 'change', function () {
	            handler(that.$newTodo.value);
	        });
	    } else if (event === 'removeCompleted') {
	        $on(that.$clearCompleted, 'click', function () {
	            handler();
	        });
	    } else if (event === 'toggleAll') {
	        $on(that.$toggleAll, 'click', function () {
	            handler({ completed: this.checked });
	        });
	    } else if (event === 'itemEdit') {
	        $delegate(that.$todoList, 'li label', 'dblclick', function () {
	            handler({ id: that._itemId(this) });
	        });
	    } else if (event === 'itemRemove') {
	        $delegate(that.$todoList, '.destroy', 'click', function () {
	            handler({ id: that._itemId(this) });
	        });
	    } else if (event === 'itemToggle') {
	        $delegate(that.$todoList, '.toggle', 'click', function () {
	            handler({
	                id: that._itemId(this),
	                completed: this.checked
	            });
	        });
	    } else if (event === 'itemEditDone') {
	        that._bindItemEditDone(handler);
	    } else if (event === 'itemEditCancel') {
	        that._bindItemEditCancel(handler);
	    }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Takes a model and view and acts as the controller between them
	 *
	 * @constructor
	 * @param {object} model The model instance
	 * @param {object} view The view instance
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.Controller = Controller;

	function Controller(model, view) {
	  var that = this;
	  that.model = model;
	  that.view = view;

	  that.view.bind('newTodo', function (title) {
	    that.addItem(title);
	  });

	  that.view.bind('itemEdit', function (item) {
	    that.editItem(item.id);
	  });

	  that.view.bind('itemEditDone', function (item) {
	    that.editItemSave(item.id, item.title);
	  });

	  that.view.bind('itemEditCancel', function (item) {
	    that.editItemCancel(item.id);
	  });

	  that.view.bind('itemRemove', function (item) {
	    that.removeItem(item.id);
	  });

	  that.view.bind('itemToggle', function (item) {
	    that.toggleComplete(item.id, item.completed);
	  });

	  that.view.bind('removeCompleted', function () {
	    that.removeCompletedItems();
	  });

	  that.view.bind('toggleAll', function (status) {
	    that.toggleAll(status.completed);
	  });
	}

	/**
	 * Loads and initialises the view
	 *
	 * @param {string} '' | 'active' | 'completed'
	 */
	Controller.prototype.setView = function (locationHash) {
	  var route = locationHash.split('/')[1];
	  var page = route || '';
	  this._updateFilterState(page);
	};

	/**
	 * An event to fire on load. Will get all items and display them in the
	 * todo-list
	 */
	Controller.prototype.showAll = function () {
	  var that = this;
	  that.model.read(function (data) {
	    that.view.render('showEntries', data);
	  });
	};

	/**
	 * Renders all active tasks
	 */
	Controller.prototype.showActive = function () {
	  var that = this;
	  that.model.read({ completed: false }, function (data) {
	    that.view.render('showEntries', data);
	  });
	};

	/**
	 * Renders all completed tasks
	 */
	Controller.prototype.showCompleted = function () {
	  var that = this;
	  that.model.read({ completed: true }, function (data) {
	    that.view.render('showEntries', data);
	  });
	};

	/**
	 * An event to fire whenever you want to add an item. Simply pass in the event
	 * object and it'll handle the DOM insertion and saving of the new item.
	 */
	Controller.prototype.addItem = function (title) {
	  var that = this;

	  if (title.trim() === '') {
	    return;
	  }

	  that.model.create(title, function () {
	    that.view.render('clearNewTodo');
	    that._filter(true);
	  });
	};

	/*
	 * Triggers the item editing mode.
	 */
	Controller.prototype.editItem = function (id) {
	  var that = this;
	  that.model.read(id, function (data) {
	    that.view.render('editItem', { id: id, title: data[0].title });
	  });
	};

	/*
	 * Finishes the item editing mode successfully.
	 */
	Controller.prototype.editItemSave = function (id, title) {
	  var that = this;
	  if (title.trim()) {
	    that.model.update(id, { title: title }, function () {
	      that.view.render('editItemDone', { id: id, title: title });
	    });
	  } else {
	    that.removeItem(id);
	  }
	};

	/*
	 * Cancels the item editing mode.
	 */
	Controller.prototype.editItemCancel = function (id) {
	  var that = this;
	  that.model.read(id, function (data) {
	    that.view.render('editItemDone', { id: id, title: data[0].title });
	  });
	};

	/**
	 * By giving it an ID it'll find the DOM element matching that ID,
	 * remove it from the DOM and also remove it from storage.
	 *
	 * @param {number} id The ID of the item to remove from the DOM and
	 * storage
	 */
	Controller.prototype.removeItem = function (id) {
	  var that = this;
	  that.model.remove(id, function () {
	    that.view.render('removeItem', id);
	  });

	  that._filter();
	};

	/**
	 * Will remove all completed items from the DOM and storage.
	 */
	Controller.prototype.removeCompletedItems = function () {
	  var that = this;
	  that.model.read({ completed: true }, function (data) {
	    data.forEach(function (item) {
	      that.removeItem(item.id);
	    });
	  });

	  that._filter();
	};

	/**
	 * Give it an ID of a model and a checkbox and it will update the item
	 * in storage based on the checkbox's state.
	 *
	 * @param {number} id The ID of the element to complete or uncomplete
	 * @param {object} checkbox The checkbox to check the state of complete
	 *                          or not
	 * @param {boolean|undefined} silent Prevent re-filtering the todo items
	 */
	Controller.prototype.toggleComplete = function (id, completed, silent) {
	  var that = this;
	  that.model.update(id, { completed: completed }, function () {
	    that.view.render('elementComplete', {
	      id: id,
	      completed: completed
	    });
	  });

	  if (!silent) {
	    that._filter();
	  }
	};

	/**
	 * Will toggle ALL checkboxes' on/off state and completeness of models.
	 * Just pass in the event object.
	 */
	Controller.prototype.toggleAll = function (completed) {
	  var that = this;
	  that.model.read({ completed: !completed }, function (data) {
	    data.forEach(function (item) {
	      that.toggleComplete(item.id, completed, true);
	    });
	  });

	  that._filter();
	};

	/**
	 * Updates the pieces of the page which change depending on the remaining
	 * number of todos.
	 */
	Controller.prototype._updateCount = function () {
	  var that = this;
	  that.model.getCount(function (todos) {
	    that.view.render('updateElementCount', todos.active);
	    that.view.render('clearCompletedButton', {
	      completed: todos.completed,
	      visible: todos.completed > 0
	    });

	    that.view.render('toggleAll', { checked: todos.completed === todos.total });
	    that.view.render('contentBlockVisibility', { visible: todos.total > 0 });
	  });
	};

	/**
	 * Re-filters the todo items, based on the active route.
	 * @param {boolean|undefined} force  forces a re-painting of todo items.
	 */
	Controller.prototype._filter = function (force) {
	  var activeRoute = this._activeRoute.charAt(0).toUpperCase() + this._activeRoute.substr(1);

	  // Update the elements on the page, which change with each completed todo
	  this._updateCount();

	  // If the last active route isn't "All", or we're switching routes, we
	  // re-create the todo item elements, calling:
	  //   this.show[All|Active|Completed]();
	  if (force || this._lastActiveRoute !== 'All' || this._lastActiveRoute !== activeRoute) {
	    this['show' + activeRoute]();
	  }

	  this._lastActiveRoute = activeRoute;
	};

	/**
	 * Simply updates the filter nav's selected states
	 */
	Controller.prototype._updateFilterState = function (currentPage) {
	  // Store a reference to the active route, allowing us to re-filter todo
	  // items as they are marked complete or incomplete.
	  this._activeRoute = currentPage;

	  if (currentPage === '') {
	    this._activeRoute = 'All';
	  }

	  this._filter();

	  this.view.render('setFilter', currentPage);
	};

/***/ }
/******/ ]);