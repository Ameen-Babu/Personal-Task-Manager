import { useState } from 'react'
import axios from 'axios'

function TaskForm({ onTaskAdded }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        const user = JSON.parse(localStorage.getItem('user'))

        if (!user || !user.token) {
            alert('You are not logged in!')
            return
        }

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        }

        try {
            const response = await axios.post('/api/tasks', { title, description }, config)
            onTaskAdded(response.data)
            setTitle('')
            setDescription('')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section className='task-form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='text'>Task Title</label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Description</label>
                    <input
                        type='text'
                        name='description'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <button className='btn btn-block' type='submit'>
                        Add Task
                    </button>
                </div>
            </form>
        </section>
    )
}

export default TaskForm
