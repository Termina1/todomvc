/**
 * Creates a new client side storage object and will create an empty
 * collection if no collection already exists.
 *
 * @param {string} name The name of our DB we want to use
 * @param {function} callback Our fake DB uses callbacks because in
 * real life you probably would be making AJAX calls
 */
export function Store(name, callback) {
  callback = callback || function () {};
  this.data = [];
  fetch('/get')
    .then(function(r) { return r.json()})
    .then(function(r) {
      this.data = r;
      callback(this.data);
    }.bind(this));
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
