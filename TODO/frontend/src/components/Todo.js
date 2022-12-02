import React from 'react';


const TodoItem = ({item}) => {

    return(
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
        </tr>
    )
}

const TodoList = ({items}) => {

    return (
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
            {items.map((item_) => <TodoItem item={item_} />)}
        </table>
    )
}

export default TodoList