app.views.TodoListView = function () {
  //this.todoList = new TodoList();
  this.handleEvent('addTodo');
  this.handleEvent('deleteTodo');
  this.handleEvent('editTodo');
  this.handleEvent('checkAll');
  this.handleEvent('check');
  this.handleEvent('active');
  this.handleEvent('completed');
  this.handleEvent('all');
  this.handleEvent('clear');
}

app.views.TodoListView.prototype.renderTodos = function (todos) {

}

app.views.TodoListView.prototype.getTodo = function (self) {
  var id = self.attr('data-id'); // attribute
  return id;
}


app.views.TodoListView.prototype.handleEvent = function (event) {
  var self = this;
  switch (event) {
    case 'addTodo':
      $('.text-in').on('keypress', function (e) {
        if (e.keyCode === 13) {
          var todo = new Todo($('.text-in').val());
          app.todoList.addTodo(todo); //add todo from array
          $('.todolist').append('<li data-id="' + todo.id + '" > <div class="view">' +
            '<input class="check-todo" type="checkbox" />' +
            '<input hidden class="todo-editing" type="text" />' +
            '<label class="text-todo">' + $('.text-in').val() + '</label>' +
            '<button hidden class="delete-todo"> x </button>' +
            '<hr> </div></li>');
            $('.number-item').text(app.todoList.checkListNonActive().length + ' item left'); 
            $('.select').show();
          $('.text-in').val('');
        }
      })
      break;
    case 'editTodo':
      $('body').on('dblclick', 'label', function (event) {
        $(this).hide();
        $(this).prev().prev().hide();
        $(this).prev().val($(this).html());
        $(this).prev().show();
        $(this).prev().focus()

      })
      $('.todolist').on('focusout', 'input.todo-editing', function (event) {
        app.todoList.editTodo(self.getTodo($(this).parent()), $(this).val()); //edit array todo
        $(this).hide();
        $(this).prev().show();
        $(this).next().html($(this).val());
        $(this).next().show();

      })
      break;

    case 'deleteTodo':
      $('.todolist').on('mouseover', 'li', function (event) {
        if ($(this).children().children('.todo-editing').is(':visible') === false) {
          $(this).children().children('button').show();
        }
      })
      $('.todolist').on('mouseout', 'li', function (event) {
        $(this).children().children('button').hide();
      })
      $('.todolist').on('click', 'button', function (event) {
        app.todoList.deleteTodo(self.getTodo($(this).parent().parent())); //delete a todo
        $('.number-item').text(app.todoList.checkListNonActive().length + ' item left');
        $(this).parent().parent().remove();
      })

      break;
    case 'checkAll':
      $('.wrap').on('click', '.check-all-todo', function (event) {
        if ($(this).is(':checked')) {
          app.todoList.checkAll(true);
          $('.check-todo').prop("checked", true);
        } else {
          app.todoList.checkAll(false);
          $('.check-todo').prop("checked", false);
        }
        $('.number-item').text(app.todoList.checkListNonActive().length + ' item left');
      })

      break;

    case 'check':
      $('.wrap').on('click', '.check-todo', function (event) {
        if ($(this).is(':checked')) {
          app.todoList.check(self.getTodo($(this).parent().parent()), true);
          $(this).prop("checked", true);
        } else {
          app.todoList.check(self.getTodo($(this).parent().parent()), false);
          $(this).prop("checked", false);
        }
        $('.number-item').text(app.todoList.checkListNonActive().length + ' item left');
        console.log('aaa')
      })
      break;
      case 'active':
      $('.wrap').on('click', '.active', function (event) {
        var list = app.todoList.checkListNonActive();
        var numOfArr = list.length;
        $('li').hide();
        for (var i = 0; i < numOfArr; i++) {
          $("[data-id ='" + list[i] +"']").show();
        }
        
      })
      break;
      case 'completed':
      $('.wrap').on('click', '.completed', function (event) {
        var list = app.todoList.checkListActive();
        var numOfArr = list.length;
        $('li').hide();
        for (var i = 0; i < numOfArr; i++) {
          $("[data-id ='" + list[i] +"']").show();
        }
        
      })
      break;

      case 'all':
      $('.wrap').on('click', '.all', function (event) {
        $('li').show();
      })
      break;

      case 'clear':
      $('.wrap').on('click', '.clear', function (event) {
        var list = app.todoList.checkListActive();
        var numOfArr = list.length;
        for (var i = 0; i < numOfArr; i++) {
          $("[data-id ='" + list[i] +"']").remove();
        }
      })
      break;
    default:
      break;
  }
}
