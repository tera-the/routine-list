export type TasksType = {
    id: number;
    title: string;
    completed: boolean;
}

export type TaskItemProps = {
    task: TasksType;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export type FilterProps = 'All' | 'Done' | 'Not done';