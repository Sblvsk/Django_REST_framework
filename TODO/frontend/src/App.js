import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from "./components/Todo.js";
import axios from 'axios';


class App extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      "users": [],
      "projects": [],
      "todos": [],
    }
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8013/api/users/").then(response => {
        this.setState(
        {
          "users":response.data
        })
    }).catch(error =>  console.log(error))


    axios.get("http://127.0.0.1:8013/api/projects/").then(response => {
        this.setState(
        {
          "projects":response.data.results
        })
    }).catch(error =>  console.log(error))

      axios.get("http://127.0.0.1:8013/api/todo/").then(response => {
        this.setState(
        {
          "todos":response.data.results
        })
    }).catch(error =>  console.log(error))

  }

  render() {
    return (
      <div>
         <UserList users={this.state.users} />
         <ProjectList items={this.state.projects} />
         <TodoList items={this.state.todos} />
      </div>
    )
  }
}

export default App;
