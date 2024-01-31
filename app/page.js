"use client";
import Todo from "@/components/Todo";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CustomToast } from "@/components/CustomToast";
import axios from "axios";

export default function Home() {
    const notify = (type, msg) => {
        if (type == "success") {
            toast.success(msg);
        } else if (type == "error") {
            toast.error(msg);
        } else if (type == "loading") {
            toast.loading(msg);
        } else {
            toast.error("Wrong Message Type");
        }
    };
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const [todoData, setTodoData] = useState([]);
    const fetchTodos = async () => {
        //notify("loading", "Fetching TODO's");
        try {
            const res = await axios.get("/api");
            if (res.status == 200) {
                setTodoData(res.data.todos);
            }
        } catch (error) {
            alert("Error occured while fetching data: " + error.message);
        }
    };
    const deleteTodo = async (mongoId) => {
        //notify("loading", "Deleting TODO's");
        try {
            const res = await axios.delete("/api", {
                params: {
                    mongoId: mongoId,
                },
            });
            if (res.status == 200) {
                notify("success", res.data.message);
                await fetchTodos();
            }
        } catch (error) {
            alert("Error occured while deleting data: " + error.message);
        }
    };

    const updateTodo = async (id) => {
        try {
            const res = await axios.put(
                "/api",
                {},
                {
                    params: {
                        mongoId: id,
                    },
                }
            );

            notify("success", res.data.message);
            fetchTodos();
        } catch (error) {
            alert("Error occured while updating data P : " + error.message);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData, [name]: value };
            //console.log(updatedFormData);
            return updatedFormData;
        });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        //console.log(formData);
        if (formData.title == "" && formData.description == "") {
            alert("Input Fields are Empty");
            return false;
        } else {
            try {
                //api code
                const res = await axios.post("/api", formData);
                if (res.status == 200) {
                    notify("success", res.data.message);
                    setFormData({
                        title: "",
                        description: "",
                    });
                    await fetchTodos();
                }
            } catch (error) {
                notify("error", "Frontend Error ".error.message);
            }
        }
    };

    return (
        <>
            <form
                onSubmit={onSubmitHandler}
                className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto"
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Enter Title.."
                    className="px-3 py-2 border-2 w-full"
                    onChange={onChangeHandler}
                    value={formData.title}
                />
                <textarea
                    name="description"
                    placeholder="Enter Description.."
                    className="px-3 py-2 border-2 w-full"
                    value={formData.description}
                    onChange={onChangeHandler}
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-600 py-3 px-3 text-white hover:bg-black hover:transition-all transition ease-in-out delay-100"
                >
                    Add TODO
                </button>
            </form>
            <div className="overflow-x-auto mt-24 w-[100%] mx-auto sm:w-[70%]">
                <table className="w-full text-sm text-left rtl:text-right text-black divide-y divide-gray-200">
                    <thead className="text-xs text-black uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 sm:justify-center sm:items-center hidden sm:flex"
                            >
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {todoData.map((item, index) => (
                            <Todo
                                key={index}
                                id={index}
                                title={item.title}
                                description={item.description}
                                complete={item.isCompleted}
                                mongoId={item._id}
                                deleteTodo={deleteTodo}
                                updateTodo={updateTodo}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <CustomToast />
        </>
    );
}
