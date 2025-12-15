import axios from 'axios'

function TaskItem({ task, onDelete }) {
    const user = JSON.parse(localStorage.getItem('user'))

    const deleteTask = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        }
        await axios.delete(`/api/tasks/${task._id}`, config)
        onDelete(task._id)
    }

    return (
        <div className='task'>
            <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <small>{new Date(task.createdAt).toLocaleString()}</small>
            </div>
            <button onClick={deleteTask} className='btn btn-delete'>
                X
            </button>
        </div>
    )
}

export default TaskItem
