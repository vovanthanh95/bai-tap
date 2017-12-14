var Todo = function(text){
    this.id = new Date().valueOf();
    this.text = text;
    this.isCompleted = false;
}

Todo.prototype.editTodo = function(text){
    this.text = text;
}