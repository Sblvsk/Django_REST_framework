import React from 'react';
import {Link} from "react-router-dom";

const ProjectItem = ({item, deleteProject}) => {

    return (
        <tr>
            <td>
                <Link to={`projects/${item.id}`}>{item.name}</Link>
            </td>
            <td>
                {item.href_repository}
            </td>
            <td>
                {item.users}
            </td>
            <td>
                <button onClick={() => deleteProject(item.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({items, deleteProject}) => {

    return (
        <table>
            <th>
                Name
            </th>
            <th>
                href
            </th>
            <th>
                Users
            </th>
            <th></th>
            {items.map((item_) => <ProjectItem item={item_} deleteProject={deleteProject}/>)}
        </table>
    )
}

export default ProjectList