app.models.TodoList = function () {
  this.todos = [];
  // delete
  // add
  // filter
  // clearCompleted
  // toggleAllTodos
  // renderTodos
}

app.models.TodoList.prototype.addTodo = function (todo) {
  this.todos.push(todo);
}

app.models.TodoList.prototype.checkAll = function (checked) {
  var numOfArr = this.todos.length;
  for (var i = 0; i < numOfArr; i++) {
    this.todos[i].isCompleted = checked;
  }
}

app.models.TodoList.prototype.editTodo = function (id, text) {
  var numOfArr = this.todos.length;
  for (var i = 0; i < numOfArr; i++) {
    if (id == this.todos[i].id) {
      this.todos[i].editTodo(text);
    }
  }
}

app.models.TodoList.prototype.check = function (id, checked) {
  var numOfArr = this.todos.length;
  for (var i = 0; i < numOfArr; i++) {
    if (id == this.todos[i].id) {
      this.todos[i].isCompleted = checked;
    }
  }
}

app.models.TodoList.prototype.deleteTodo = function (id) {
  var indexDeleteTodo = '';
  this.todos.find(function (todo, index) {
    indexDeleteTodo = index;
    return todo.id == id
  });
  this.todos.splice(indexDeleteTodo, 1)
}

app.models.TodoList.prototype.checkListActive = function () { //return arr is checked
  var numOfArr = this.todos.length;
  var list = [];
  for (var i = 0; i < numOfArr; i++) {
    if (this.todos[i].isCompleted) {
      list.push(this.todos[i].id);
    }
  }

  return list;
}

app.models.TodoList.prototype.checkListNonActive = function () { //return arr is checked
  var numOfArr = this.todos.length;
  var list = [];
  for (var i = 0; i < numOfArr; i++) {
    if (this.todos[i].isCompleted == false) {
      list.push(this.todos[i].id);
    }
  }

  return list;
}