import { useState, type ChangeEvent } from 'react'
import { type FilterProps, type TasksType } from './types/tasks'
import { Button } from './components/ui/button'
import TaskItem from './components/ui/TaskItem'
import { SquarePlus, BookText } from 'lucide-react'
import { Input } from './components/ui/input'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [tasks, setTasks] = useLocalStorage<TasksType[]>('todo-list', [])

  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<FilterProps>('All');

  const handleCreate = () => {
    if (!newTodo.trim()) return;

    const newId =
      tasks.length > 0
        ? Math.max(...tasks.map(task => task.id)) + 1
        : 1;

    const newTask: TasksType = {
      id: newId,
      title: newTodo,
      completed: false,
    }

    setTasks(prev => [...prev, newTask])
    setNewTodo('')
  }

  const handleDelete = (id: number) => {
    setTasks(prev => prev.filter(i => i.id !== id))
  }

  const handleToggle = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreate()
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Done') return task.completed
    if (filter === 'Not done') return !task.completed
    return true;
  })

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='max-w-2xl w-full border border-gray-300 bg-[#fcfcfc] shadow-lg p-7 rounded-md'>

        {/* ЗАГОЛОВОК */}
        <div className='flex justify-between items-center mb-6'>
          <h1 className='font-normal text-2xl'>Tasks</h1>

          <div className='flex gap-3'>
            <Button
              onClick={() => setFilter('All')}
              className={`w-20`} variant={filter === 'All' ? 'default' : 'outline'} size={'lg'}>
              All
            </Button>

            <Button
              onClick={() => setFilter('Done')}
              className={`w-20`} variant={filter === 'Done' ? 'default' : 'outline'} size={'lg'}>
              Done
            </Button>

            <Button
              onClick={() => setFilter('Not done')}
              className='w-20' variant={filter === 'Not done' ? 'default' : 'outline'} size={'lg'}>
              Not done
            </Button>
          </div>
        </div>

        {/* ЗАДАЧИ */}

        <div className='mb-4 flex flex-col gap-3'>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                onDelete={handleDelete}
                onToggle={handleToggle}
                key={task.id} task={task} />
            ))
          ) : (
            <div className='gap-2 text-gray-400 text-xl flex justify-center items-center p-5'>
              <BookText />
              <h1>No tasks yet</h1>
            </div>
          )}
        </div>

        {/* СОЗДАНИЕ ЗАДАЧ */}



        <div className='flex gap-1'>
          <Input
            onKeyDown={handleKeyDown}
            className='rounded-none py-5 focus-visible:ring-0 focus-visible:outline-0'
            onChange={onChange}
            value={newTodo}
          />
          <Button
            onClick={handleCreate}
            className='select-none rounded-none text-md py-5' variant={'default'}>
            <SquarePlus
            />
          </Button>
        </div>

      </div>
    </div >
  )
}

export default App
