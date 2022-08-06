import { useEffect, useRef, useState } from "react";
import { FaPlusCircle, FaSun } from "react-icons/fa";
import Task from "./Task";
import { v4 } from "uuid";

export interface TaskInterface {
    id: string;
    title: string;
    completed: boolean;
}

enum FIlterEnum {
    ALL,
    COMPLETED,
    NOTCOMPLETED,
}

const App = () => {
    const refInput = useRef<HTMLInputElement | null>(null);
    const [textTask, setTextTask] = useState("");
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [filter, setFilter] = useState<FIlterEnum>(FIlterEnum.ALL);
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const tasksInLocalStorage = window.localStorage.getItem("tasks");
        if (tasksInLocalStorage) {
            setTasks(JSON.parse(tasksInLocalStorage) as TaskInterface[]);
        } else {
            window.localStorage.setItem("tasks", "[]");
        }

        const darkInLocalStorage = window.localStorage.getItem("dark");
        console.log(darkInLocalStorage);
        if (darkInLocalStorage !== null) {
            setDark(darkInLocalStorage === "true");
        }
    }, []);

    useEffect(() => {
        if (dark) {
            (document.querySelector("html") as HTMLElement).classList.add(
                "dark"
            );
        } else {
            (document.querySelector("html") as HTMLElement).classList.remove(
                "dark"
            );
        }
    }, [dark]);

    const changeCompleted = (id: string) => () => {
        const indexTask = tasks.findIndex((task) => task.id === id);
        if (indexTask >= 0) {
            const newTasks = [
                ...tasks.slice(0, indexTask),
                { ...tasks[indexTask], completed: !tasks[indexTask].completed },
                ...tasks.slice(indexTask + 1),
            ];
            window.localStorage.setItem("tasks", JSON.stringify(newTasks));
            setTasks(newTasks);
        }
    };

    const deleteTasks = (id: string) => () => {
        const indexTask = tasks.findIndex((task) => task.id === id);
        if (indexTask >= 0) {
            const newTasks = [
                ...tasks.slice(0, indexTask),
                ...tasks.slice(indexTask + 1),
            ];
            window.localStorage.setItem("tasks", JSON.stringify(newTasks));
            setTasks(newTasks);
        }
    };

    const actionOnClickPlus = () => {
        const newTasks = [
            ...tasks,
            { id: v4(), title: textTask, completed: false },
        ];
        window.localStorage.setItem("tasks", JSON.stringify(newTasks));
        setTasks(newTasks);
        setTextTask("");
        document.body.focus();
    };

    return (
        <div className="py-8 px-4 flex flex-col max-w-xl mx-auto h-screen relative">
            <div className="flex items-center">
                <h1 className="font-semibold text-3xl">TODO</h1>
                <button
                    className="ml-auto"
                    onClick={() => {
                        window.localStorage.setItem("dark", String(!dark));
                        setDark(!dark);
                    }}
                >
                    <FaSun />
                </button>
            </div>
            <div className="flex gap-x-2 mt-4">
                <input
                    ref={refInput}
                    type="text"
                    className="w-full block shadow rounded px-4 py-1 text-sm font-light bg-gray-100 dark:bg-[#293046]"
                    value={textTask}
                    onInput={(e) => setTextTask(e.currentTarget.value)}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            actionOnClickPlus();
                        }
                    }}
                    placeholder="Add todo ..."
                />
                <button
                    className="bg-blue-600 px-4 rounded shadow text-white"
                    onClick={actionOnClickPlus}
                >
                    <FaPlusCircle />
                </button>
            </div>
            <ul className="text-xs font-semibold flex justify-around mt-4">
                <li
                    className={
                        "flex justify-center " +
                        (filter === FIlterEnum.ALL && "text-blue-600")
                    }
                    onClick={() => setFilter(FIlterEnum.ALL)}
                >
                    <button>All ({tasks.length})</button>
                </li>
                <li
                    className={
                        "flex justify-center " +
                        (filter === FIlterEnum.NOTCOMPLETED && "text-blue-600")
                    }
                    onClick={() => setFilter(FIlterEnum.NOTCOMPLETED)}
                >
                    <button>
                        Not Completed (
                        {tasks.filter((task) => !task.completed).length})
                    </button>
                </li>
                <li
                    className={
                        "flex justify-center " +
                        (filter === FIlterEnum.COMPLETED && "text-blue-600")
                    }
                    onClick={() => setFilter(FIlterEnum.COMPLETED)}
                >
                    <button>
                        Completed (
                        {tasks.filter((task) => task.completed).length})
                    </button>
                </li>
            </ul>
            <button
                className="absolute right-4 top-[90vh] bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center"
                onClick={() => {
                    if (refInput.current) {
                        refInput.current.focus();
                    }
                }}
            >
                <FaPlusCircle />
            </button>
            <ul className="mt-4 flex flex-col gap-y-2 flex-grow overflow-y-auto">
                {tasks
                    .filter((task) => {
                        switch (filter) {
                            case FIlterEnum.ALL:
                                return true;
                            case FIlterEnum.COMPLETED:
                                return task.completed;
                            case FIlterEnum.NOTCOMPLETED:
                                return !task.completed;
                        }
                    })
                    .map((task, i) => (
                        <li key={i}>
                            <Task
                                task={task}
                                changeCompleted={changeCompleted(task.id)}
                                deleteTask={deleteTasks(task.id)}
                            />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default App;
