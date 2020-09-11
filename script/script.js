'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.getItem('savesToDo')) || [];

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item, i) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">'+ item.value +'</span>' + 
      '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
      '</div>';

    if(item.completed) {
      todoCompleted.prepend(li);
    } else {
      todoList.prepend(li);
    }

    const btnTodoCompleted = li.querySelector('.todo-complete'),
      btnTodoRemove = li.querySelector('.todo-remove');

    btnTodoCompleted.addEventListener('click', function() {
      item.completed = !item.completed;
      saveToDo();
      render(); 
    });
    
    btnTodoRemove.addEventListener('click',function(event) {
      todoData.splice(i,1);
      saveToDo();
      render();
    });
  });
},
saveToDo = () => {
  localStorage.setItem('savesToDo', JSON.stringify(todoData));
};
render();
todoControl.addEventListener('submit', function(event) {
  event.preventDefault();
  if(headerInput.value.trim() === '') {
    alert('Введи событие!');
    return;
  }
  const newTodo = {
    value: headerInput.value,
    completed: false
  };

  todoData.push(newTodo);
  todoControl.reset();
  saveToDo();
  render();
});
