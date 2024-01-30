import React from "react";

const Todo = ({
    id,
    title,
    description,
    complete,
    mongoId,
    deleteTodo,
    updateTodo,
}) => {
    return (
        <tr className="bg-white border-b">
            <th
                scope="row"
                className="px-6 py-4 font-medium text-black whitespace-nowrap "
            >
                {id + 1}
            </th>
            <td className={`px-6 py-4 ${complete ? "line-through" : ""}`}>
                {title}
            </td>
            <td className={`px-6 py-4 ${complete ? "line-through" : ""}`}>
                {description}
            </td>
            <td
                className={`px-6 py-4 ${
                    complete ? "text-red-500" : "text-green-500"
                }`}
            >
                <b
                    className={`${
                        complete ? " text-red-700 bg-red-200" : ""
                    } px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm`}
                >
                    {complete ? "Completed" : "Pending"}
                </b>
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
                {complete ? (
                    ""
                ) : (
                    <button
                        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            updateTodo(mongoId);
                        }}
                    >
                        {complete ? "Undo" : "Done"}
                    </button>
                )}
            </td>
        </tr>
    );
};

export default Todo;
