import { FaCheck } from "react-icons/fa";

import { TaskInterface } from "./App";

type Props = {
    task: TaskInterface;
    changeCompleted: () => void;
};

const Task = (props: Props) => {
    return (
        <div
            className={
                "border dark:border-[#333] dark:shadow-gray-400/20 px-4 py-2 rounded shadow text-sm font-light flex items-center " +
                (props.task.completed
                    ? "bg-blue-100 dark:bg-[#697086] "
                    : "bg-gray-100 dark:bg-[#293046]")
            }
        >
            <span className="">{props.task.title}</span>
            <button
                className={
                    "ml-auto text-white w-8 aspect-square flex justify-center items-center rounded-full " +
                    (props.task.completed
                        ? "bg-blue-600 dark:bg-[#293046]"
                        : "bg-gray-600 dark:bg-[#697086]")
                }
                onClick={() => {
                    props.changeCompleted();
                }}
            >
                <FaCheck />
            </button>
        </div>
    );
};

export default Task;
