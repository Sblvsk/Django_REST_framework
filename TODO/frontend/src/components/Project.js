import React from 'react';
import {Link} from "react-router-dom";

const ProjectItem = ({item}) => {

    return(
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
        </tr>
    )
}

const ProjectList = ({items}) => {

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
            {items.map((item_) => <ProjectItem item={item_} />)}
        </table>
    )
}

export default ProjectList