import { FaCheck, FaTrashAlt } from "react-icons/fa";

import { TaskInterface } from "./App";

type Props = {
    task: TaskInterface;
    changeCompleted: () => void;
    deleteTask: () => void;
};

const Task = (props: Props) => {
    return (
        <div
            className={
                "border dark:border-[#333] dark:shadow-gray-400/20 px-4 py-2 rounded shadow text-sm font-light flex gap-x-4 items-center " +
                (props.task.completed
                    ? "bg-blue-100 dark:bg-[#697086] "
                    : "bg-gray-100 dark:bg-[#293046]")
            }
        >
            <button
                className={
                    " text-white w-8 aspect-square flex justify-center items-center rounded-full " +
                    (props.task.completed
                        ? "bg-blue-600 dark:bg-[#293046]"
                        : "bg-gray-600 dark:bg-[#697086]")
                }
                onClick={props.changeCompleted}
            >
                <FaCheck />
            </button>
            <span className="truncate w-full">{props.task.title}</span>
            <button
                className="text-white w-8 aspect-square flex justify-center items-center rounded-full bg-red-600"
                onClick={props.deleteTask}
            >
                <FaTrashAlt className="text-xs" />
            </button>
        </div>
    );
};

export default Task;
