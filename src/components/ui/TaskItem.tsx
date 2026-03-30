import type { TaskItemProps } from "@/types/tasks"
import { Button } from "./button"

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {

    return (
        <div className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 shadow">
            <div className="flex items-center gap-3">
                <input
                    checked={task.completed}
                    type="checkbox"
                    className="h-5 w-5 accent-black-500 cursor-pointer"
                    onChange={() => onToggle(task.id)}
                />
                <span className={`text-lg 
                    ${task.completed ? "line-through text-gray-400" : "text-black"}
                    `}>{task.title}</span>
            </div>

            <Button
                size={'lg'}
                className='px-5'
                variant={'destructive'}
                onClick={() => onDelete(task.id)}
            >
                Delete
            </Button>
        </div >
    )
}

export default TaskItem
