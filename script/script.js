'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.getItem('savesToDo')) || [];

const saveTodo = function(){
  localStorage.setItem('savesTodo', JSON.stringify(todoData));
};

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item, i){
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">'+ item.value +'</span>' + 
      '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
      '</div>';

    if(item.completed){
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoCompleted = li.querySelector('.todo-complete'),
      btnTodoRemove = li.querySelector('.todo-remove');

    btnTodoCompleted.addEventListener('click', function(){
      item.completed = !item.completed;
      saveTodo();
      render(); 
    });
    
    btnTodoRemove.addEventListener('click',function(){
      todoData.splice(i,1);
      saveTodo();
      render();
    });
  });
};
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
  headerInput.value = '';
  saveTodo();
  render();
});

render();