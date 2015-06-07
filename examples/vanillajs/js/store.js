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


Store.prototype.commit = function (data, cb) {
  let old = this.data;
  this.data = data;
  fetch('/set', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.data)
  }).then(resp => resp.json())
    .then(data => this.data = data)
    .catch(error => {
      this.data = old;
      cb.call(this, this.data, new Error("You are working offline, changes can't be made!"));
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
Store.prototype.save = function (updateData, callback, ids) {
  var todos = this.data;

  callback = callback || function () {};

  // If an ID was actually given, find the item and update each property
  if (ids) {
    if(!ids.length) {
      ids = [ids];
    }
    todos = todos
      .map((item) => {
        if(!ids.includes(item.id)) {
          return item;
        }
        let update = Object.assign({}, item);
        Object.keys(updateData).forEach((key) => {
          update[key] = updateData[key];
        });
        return update;
      });
    this.commit(todos, callback);
    callback.call(this, todos);
  } else {
    // Generate an ID
    updateData.id = new Date().getTime();
    todos = todos.concat([updateData]);
    this.commit(todos, callback);
    callback.call(this, [updateData]);
  }
};

/**
 * Will remove an item from the Store based on its ID
 *
 * @param {number} id The ID of the item you want to remove
 * @param {function} callback The callback to fire after saving
 */
Store.prototype.remove = function (ids, callback) {
  if(!ids.length) {
    ids = [ids];
  }
  let todos = this.data.filter(el => !ids.includes(el.id));
  this.commit(todos, callback);
  callback.call(this, todos);
};

/**
 * Will drop all storage and start fresh
 *
 * @param {function} callback The callback to fire after dropping the data
 */
Store.prototype.drop = function (callback) {
  this.commit([], callback);
  callback.call(this, []);
};
