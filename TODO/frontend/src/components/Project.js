import React from 'react';


const ProjectItem = ({item}) => {

    return(
        <tr>
            <td>
                {item.name}
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