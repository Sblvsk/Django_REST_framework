import React from 'react';
import {useParams} from "react-router-dom";


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

const TodoProjects = ({items}) => {
    let {projectId} = useParams()
    let filter_Todos = items.filter((item)=> item.projects.includes(parseInt(projectId)))

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
            {filter_Todos.map((item_) => <TodoItem item={item_} />)}
        </table>
    )
}

export default TodoProjects