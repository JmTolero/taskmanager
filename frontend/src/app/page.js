'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function TaskManager() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ Taskname: '', description: '' });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, completed
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsed = JSON.parse(userData);
    setUser(parsed);
    fetchTasks(parsed._id);
  }, [router]);

  const fetchTasks = async (userId) => {
    try {
      const res = await axios.get(`/api/tasks`, { params: { user_id: userId } });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.Taskname || !newTask.description) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post('/api/tasks', {
        ...newTask,
        user_id: user._id,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      setNewTask({ Taskname: '', description: '' });
      fetchTasks(user._id);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (taskId, updatedData) => {
    try {
      await axios.patch(`/api/tasks/${taskId}`, updatedData, {
        params: { user_id: user._id }
      });
      setEditingTask(null);
      fetchTasks(user._id);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await axios.delete(`/api/tasks/${taskId}`, {
        params: { user_id: user._id }
      });
      fetchTasks(user._id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleTaskStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    await handleUpdate(taskId, { status: newStatus });
  };

  const setTaskInProgress = async (taskId) => {
    await handleUpdate(taskId, { status: 'in-progress' });
  };

  const filteredTasks = tasks.filter(task => {
    // Filter by status
    const statusMatch = filter === 'all' || task.status === filter;
    
    // Filter by search term (title or description)
    const searchMatch = !searchTerm || 
      task.Taskname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return statusMatch && searchMatch;
  });


  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md';
      case 'in-progress': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md';
      case 'pending': return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md';
      default: return 'bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-md';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-800">Loading...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-800">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-500 to-white">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Task Manager Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-slate-700 font-medium">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Tasks</p>
                <p className="text-2xl font-bold text-slate-800">{tasks.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Pending</p>
                <p className="text-2xl font-bold text-slate-800">
                  {tasks.filter(t => t.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">In Progress</p>
                <p className="text-2xl font-bold text-slate-800">
                  {tasks.filter(t => t.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Completed</p>
                <p className="text-2xl font-bold text-slate-800">
                  {tasks.filter(t => t.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
          
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Add New Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="Taskname" className="block text-sm font-medium text-slate-700 mb-2">
                  Task Name
                </label>
                <input
                  type="text"
                  id="Taskname"
                  value={newTask.Taskname}
                  onChange={(e) => setNewTask({ ...newTask, Taskname: e.target.value })}
                  className="mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
                  placeholder="Enter task name"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
                  placeholder="Enter task description"
                />
              </div>
            </div>
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              {loading ? 'Adding...' : 'Add Task'}
            </button>
          </form>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
              <h2 className="text-lg font-medium text-gray-900">Your Tasks</h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-black block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === 'all' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                      : 'bg-white/50 text-slate-700 hover:bg-white/80 hover:shadow-md'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === 'pending' 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' 
                      : 'bg-white/50 text-slate-700 hover:bg-white/80 hover:shadow-md'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter('in-progress')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === 'in-progress' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                      : 'bg-white/50 text-slate-700 hover:bg-white/80 hover:shadow-md'
                  }`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === 'completed' 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' 
                      : 'bg-white/50 text-slate-700 hover:bg-white/80 hover:shadow-md'
                  }`}
                >
                  Completed
                </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredTasks.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-600">
                {searchTerm 
                  ? `No tasks found matching "${searchTerm}".` 
                  : filter === 'all' 
                    ? 'No tasks yet. Create your first task above!' 
                    : `No ${filter} tasks found.`
                }
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div key={task._id} className="px-6 py-4">
                  {editingTask && editingTask._id === task._id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <input
                          type="text"
                          value={editingTask.Taskname}
                          onChange={(e) => setEditingTask({ ...editingTask, Taskname: e.target.value })}
                          className="border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                          type="text"
                          value={editingTask.description}
                          onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                          className="border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdate(task._id, editingTask)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTask(null)}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => toggleTaskStatus(task._id, task.status)}
                            className={`p-1 rounded-full ${
                              task.status === 'completed' 
                                ? 'text-green-600 hover:text-green-800' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {task.status === 'completed' ? (
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                          <div>
                            <h3 className={`text-sm font-medium ${
                              task.status === 'completed' ? 'line-through text-gray-600' : 'text-gray-900'
                            }`}>
                              {task.Taskname}
                            </h3>
                            <p className={`text-sm ${
                              task.status === 'completed' ? 'text-gray-500' : 'text-gray-700'
                            }`}>
                              {task.description}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(task.status || 'pending')}`}>
                                {task.status || 'pending'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(task.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {task.status === 'pending' && (
                          <button
                            onClick={() => setTaskInProgress(task._id)}
                            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            Start
                          </button>
                        )}
                        <a
                          href={`/tasks/${task._id}`}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          Edit
                        </a>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
