import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from "./components/Todo.js";
import NotFound404 from "./components/NotFound404";
import axios from 'axios';
import {BrowserRouter, Route, Routes, Link, Navigate} from "react-router-dom";



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
          <BrowserRouter>
              <nav>
                  <li>
                      <Link to={'/'}>Users</Link>
                  </li>
                  <li>
                      <Link to={'/projects'}>Projects</Link>
                  </li>
                  <li>
                      <Link to={'/todos'}>todo</Link>
                  </li>
              </nav>
              <Routes>
                 <Route exact path ='/' element={<UserList users={this.state.users} />} />
                 <Route exact path ='/projects' element={<ProjectList items={this.state.projects} />} />
                 <Route exact path ='/todos' element={<TodoList items={this.state.todos} />} />

                 <Route path='*' element={<NotFound404/>} />
              </Routes>
          </BrowserRouter>
      </div>
    )
  }
}

export default App;
