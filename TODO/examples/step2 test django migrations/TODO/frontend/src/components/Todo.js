import React from 'react';
import {Link} from "react-router-dom";


const TodoItem = ({item, deleteTodo}) => {

    return (
        <tr>
            <td>
                {item.project}
            </td>
            <td>
                {item.note}
            </td>
            <td>
                {item.activate}
            </td>
            <td>
                <button onClick={() => deleteTodo(item.id)} type='button'>Delete</button>
            </td>

        </tr>
    )
}

const TodoList = ({items, deleteTodo}) => {

    return (
        <div>
            <table>
                <th>
                    Project
                </th>
                <th>
                    Note
                </th>
                <th>
                    Activate
                </th>
                <th></th>
                {items.map((item_) => <TodoItem item={item_} deleteTodo={deleteTodo}/>)}

            </table>
            <Link to='/todo/create'>Create</Link>
        </div>
    )
}

export default TodoList