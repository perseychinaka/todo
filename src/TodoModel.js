import Realm from 'realm';

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

class TodoItemClass extends Realm.Object {}
TodoItemClass.schema = {
  name: 'TodoItem',
  properties: {
    id: 'string',
    title: 'string',
    description: 'string',
    completed: 'bool',
  },
};

const realm = new Realm({ schema: [TodoItemClass] });

export const addTodo = (title: string, description: string): void => {
  realm.write(() => {
    realm.create('TodoItem', {
      id: new Date().getTime().toString(),
      title,
      description,
      completed: false,
    });
  });
};

export const updateTodo = (
  id: string,
  title: string,
  description: string,
  completed: boolean
): void => {
  realm.write(() => {
    const todo = realm.objectForPrimaryKey<TodoItemClass>('TodoItem', id);
    if (todo) {
      todo.title = title;
      todo.description = description;
      todo.completed = completed;
    }
  });
};

export const deleteTodo = (id: string): void => {
  realm.write(() => {
    const todo = realm.objectForPrimaryKey<TodoItemClass>('TodoItem', id);
    if (todo) {
      realm.delete(todo);
    }
  });
};

export const getAllTodos = (): TodoItem[] => {
  return realm.objects<TodoItemClass>('TodoItem');
};