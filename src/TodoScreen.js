import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import TodoViewModel from './TodoViewModel';

class TodoScreen extends Component {
  constructor(props) {
    super(props);
    this.viewModel = new TodoViewModel();
    this.state = {
      title: '',
      description: '',
    };
  }

  handleAddTodo = () => {
    const { title, description } = this.state;
    if (title && description) {
      this.viewModel.addNewTodo(title, description);
      this.setState({ title: '', description: '' });
    }
  };

  render() {
    const { title, description } = this.state;
    const { todos } = this.viewModel;
    return (
      <View>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={(text) => this.setState({ title: text })}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={(text) => this.setState({ description: text })}
        />
        <Button title="Add Todo" onPress={this.handleAddTodo} />
        {todos.map((todo) => (
          <View key={todo.id}>
            <Text>{todo.title}</Text>
            <Text>{todo.description}</Text>
            <Button
              title={todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
              onPress={() =>
                this.viewModel.updateExistingTodo(
                  todo.id,
                  todo.title,
                  todo.description,
                  !todo.completed
                )
              }
            />
            <Button
              title="Delete"
              onPress={() => this.viewModel.deleteTodoItem(todo.id)}
            />
          </View>
        ))}
      </View>
    );
  }
}

export default TodoScreen;
