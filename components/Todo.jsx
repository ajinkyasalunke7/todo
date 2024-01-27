import React from "react";

const Todo = ({ id, title, description, complete, mongoId, deleteTodo }) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                {id + 1}
            </th>
            <td className="px-6 py-4">{title}</td>
            <td className="px-6 py-4">{description}</td>
            <td className="px-6 py-4">
                <b>{complete ? "Completed" : "Pending"}</b>
            </td>
            <td className="px-6 py-4 gap-2 justify-center items-center flex">
                <button
                    className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        deleteTodo(mongoId);
                    }}
                >
                    Delete
                </button>
                <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Done
                </button>
            </td>
        </tr>
    );
};

export default Todo;
