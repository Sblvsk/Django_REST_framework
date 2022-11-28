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
        this.setState({'token': token}, () =>this.load_data())
    }

    get_token_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token':token}, () => this.load_data())
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
        if (this.is_auth()){
            headers['Authorization'] = 'Token '+this.state.token
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
                            {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
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
                        <Route exact path='/projects' element={<ProjectList items={this.state.projects}/>}/>
                        <Route exact path='/todos' element={<TodoList items={this.state.todos}/>}/>

                        <Route path='*' element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
