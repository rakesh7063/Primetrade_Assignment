import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { apiFetch } from '../utils/api';

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    // Fetch all tasks
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await apiFetch('/tasks', {
          method: 'GET'
        }, token);
        const data = await res.json();
        console.log({data});
        if (res.ok) setItems(data|| []);
      } catch (err) {}
      setLoading(false);
    };
    fetchItems();
  }, [token]);

console.log(items);
  // Admin CRUD handlers
  const handleAdd = async () => {
    if (!newTitle || !newDescription) return;
    const res = await apiFetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: newTitle, description: newDescription })
    }, token);
    if (res.ok) {
      const data = await res.json();
      setItems([...items, data.task || data.item]);
      setNewTitle('');
      setNewDescription('');
    }
  };

  const handleEdit = (item) => {
    setEditItem(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const handleUpdate = async (id) => {
    const res = await apiFetch(`/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: editTitle, description: editDescription })
    }, token);
    if (res.ok) {
      setItems(items.map(item => item.id === id ? { ...item, title: editTitle, description: editDescription } : item));
      setEditItem(null);
      setEditTitle('');
      setEditDescription('');
    }
  };

  const handleDelete = async (id) => {
    const res = await apiFetch(`/tasks/${id}`, {
      method: 'DELETE'
    }, token);
    if (res.ok) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  if (loading) return <div className="dashboard-container" style={{textAlign:'center', minHeight: '200px', display:'flex', alignItems:'center', justifyContent:'center'}}>Loading...</div>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {user?.role === 'ADMIN' && (
        <form className="add-item add-task-form" onSubmit={e => {e.preventDefault(); handleAdd();}}>
          <input
            type="text"
            placeholder="Task title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            maxLength={100}
            required
          />
          <textarea
            placeholder="Task description"
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
            rows={3}
            maxLength={500}
            required
          />
          <button type="submit">Add Task</button>
        </form>
      )}
      {items.length === 0 ? (
        <div className="no-tasks">No task is there</div>
      ) : (
        <div className="table-responsive">
          <table className="task-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                {user?.role === 'ADMIN' && <th></th>}
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  {editItem === item.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={e => setEditTitle(e.target.value)}
                          maxLength={100}
                          required
                        />
                      </td>
                      <td>
                        <textarea
                          value={editDescription}
                          onChange={e => setEditDescription(e.target.value)}
                          rows={2}
                          maxLength={500}
                          required
                        />
                      </td>
                      {user?.role === 'ADMIN' && (
                        <td>
                          <button onClick={() => handleUpdate(item.id)}>Save</button>
                          <button type="button" onClick={() => setEditItem(null)} style={{marginLeft: 8}}>Cancel</button>
                        </td>
                      )}
                    </>
                  ) : (
                    <>
                      <td className="task-title">{item.title}</td>
                      <td className="task-desc">{item.description}</td>
                      {user?.role === 'ADMIN' && (
                        <td>
                          <button onClick={() => handleEdit(item)}>Edit</button>
                          <button type="button" onClick={() => handleDelete(item.id)} style={{marginLeft: 8}}>Delete</button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
