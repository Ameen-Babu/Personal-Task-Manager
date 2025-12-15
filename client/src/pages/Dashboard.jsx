import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TaskForm from '../components/TaskForm'
import TaskItem from '../components/TaskItem'

function Dashboard() {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'))

        if (!loggedInUser || !loggedInUser.token) {
            localStorage.removeItem('user')
            navigate('/login')
        } else {
            fetchTasks(loggedInUser)
        }
    }, [navigate])

    const fetchTasks = async (currentUser) => {
        const config = {
            headers: {
                Authorization: `Bearer ${currentUser.token}`,
            },
        }
        try {
            const response = await axios.get('/api/tasks', config)
            setTasks(response.data)
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('user')
                navigate('/login')
            }
        }
    }

    const onTaskAdded = (newTask) => {
        setTasks([...tasks, newTask])
    }

    const onTaskDeleted = (id) => {
        setTasks(tasks.filter((task) => task._id !== id))
    }

    return (
        <div className='container'>
            <section className='heading'>
                <h1>Welcome {user && user.username}</h1>
                <p>Tasks Dashboard</p>
            </section>

            <TaskForm onTaskAdded={onTaskAdded} />

            <section className='content'>
                {tasks.length > 0 ? (
                    <div className='tasks'>
                        {tasks.map((task) => (
                            <TaskItem key={task._id} task={task} onDelete={onTaskDeleted} />
                        ))}
                    </div>
                ) : (
                    <h3>You have not set any tasks</h3>
                )}
            </section>
        </div>
    )
}

export default Dashboard
