import { addTodo, updateTodo, deleteTodo, getAllTodos } from './TodoModel';

class TodoViewModel {
  constructor() {
    this.todos = [];
    this.fetchTodos();
  }

  fetchTodos() {
    this.todos = getAllTodos();
  }

  addNewTodo = (title, description) => {
    addTodo(title, description);
    this.fetchTodos();
  };

  updateExistingTodo = (id, title, description, completed) => {
    updateTodo(id, title, description, completed);
    this.fetchTodos();
  };

  deleteTodoItem = (id) => {
    deleteTodo(id);
    this.fetchTodos();
  };
}

export default TodoViewModel;