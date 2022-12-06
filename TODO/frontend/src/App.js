import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from "./components/Todo.js";
import NotFound404 from "./components/NotFound404";
import TodoProjects from "./components/TodoProject";
import LoginForm from "./components/Auth";
import axios from 'axios';
import {BrowserRouter, Route, Routes, Link, Navigate} from "react-router-dom";
import Cookies from "universal-cookie";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "users": [],
            "projects": [],
            "todos": [],
            "token": "",
        }
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8013/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({
                    projects: this.state.projects.filter((item) => item.id !== id)
                })
            }).catch(error => console.log(error))
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8013/api/todo/${id}`, {headers})
            .then(response => {
                this.setState({
                    todos: this.state.todos.filter((item) => item.id !== id)
                })
            }).catch(error => console.log(error))
    }

    createProject(name, user) {
        const headers = this.get_headers()
        const data = {name: name, user: user}
        axios.post(`http://127.0.0.1:8013/api/projects/`, data, {headers})
            .then(response => {
                let new_project = response.data
                const user = this.state.users.filter((item) => item.id ===
                    new_project.user)[0]
                new_project.user = user
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

    createTodo(name, project) {
        const headers = this.get_headers()
        const data = {name: name, project: project}
        axios.post(`http://127.0.0.1:8013/api/todo/`, data, {headers})
            .then(response => {
                let new_todo = response.data
                const project = this.state.projects.filter((item) => item.id ===
                    new_todo.project)[0]
                new_todo.project = project
                this.setState({todos: [...this.state.todos, new_todo]})
            }).catch(error => console.log(error))
    }


    logout() {
        this.set_token('')
        this.setState({
            "users": [],
            "projects": [],
            "todos": [],
        })
    }

    is_auth() {
        return !!this.state.token
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    get_token_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        const data = {username: username, password: password}
        axios.post('http://127.0.0.1:8013/api-token-auth/', data).then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Ошибка'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }


    load_data() {
        const headers = this.get_headers()
        axios.get("http://127.0.0.1:8013/api/users/", {headers}).then(response => {
            this.setState(
                {
                    "users": response.data.results
                })
        }).catch(error => console.log(error))


        axios.get("http://127.0.0.1:8013/api/projects/", {headers}).then(response => {
            this.setState(
                {
                    "projects": response.data.results
                })
        }).catch(error => console.log(error))

        axios.get("http://127.0.0.1:8013/api/todo/", {headers}).then(response => {
            this.setState(
                {
                    "todos": response.data.results
                })
        }).catch(error => console.log(error))


    }

    componentDidMount() {
        this.get_token_storage()

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
                        <li>
                            {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> :
                                <Link to='/login'>Login</Link>}
                        </li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<Navigate to='/users'/>}/>
                        <Route path='/users'>
                            <Route index element={<UserList users={this.state.users}/>}/>
                            <Route path=':projectId' element={<TodoProjects todo={this.state.todo}/>}/>
                        </Route>

                        <Route exact path='/login' element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>

                        {/*<Route exact path='/todos' element={<TodoList items={this.state.todos}/>}/>*/}
                        {/*<Route exact path='/projects' element={<ProjectList items={this.state.projects}/>}/>*/}
                        <Route exact path='/projects' element={
                            <ProjectList items={this.state.projects} deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route exact path='/todos' element={
                            <TodoList items={this.state.todos} deleteTodo={(id) => this.deleteTodo(id)}/>}/>


                        <Route exact path='/projects/create'
                               element={<ProjectForm users={this.state.users} createProject={(name, user) =>
                                   this.createProject(name, user)}/>}/>

                        <Route exact path='/todo/create'
                               element={<TodoForm projects={this.state.projects} createTodo={(name, project) =>
                                   this.createTodo(name, project)}/>}/>


                        <Route path='*' element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
