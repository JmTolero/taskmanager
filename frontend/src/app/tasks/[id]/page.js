'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params || {};

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ Taskname: '', description: '', status: 'pending' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsed = JSON.parse(userData);
    setUser(parsed);
    if (id) fetchTask(parsed._id, id);
  }, [id, router]);

  const fetchTask = async (userId, taskId) => {
    try {
      const res = await axios.get(`/api/tasks/${taskId}`, { params: { user_id: userId } });
      const data = res.data;
      if (res.status >= 200 && res.status < 300 && data?.data) {
        const t = data.data;
        setForm({
          Taskname: t.Taskname || '',
          description: t.description || '',
          status: t.status || 'pending'
        });
      } else {
        setError(data.message || 'Failed to load task');
      }
    } catch (e) {
      setError('Network error loading task');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.patch(`/api/tasks/${id}`, form, { params: { user_id: user._id } });
      router.push('/');
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to update task');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-500 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-800">Loading task...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-500 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Edit Task</h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-red-700">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <div>
            <label htmlFor="Taskname" className="block text-sm font-medium text-slate-700 mb-2">Task Name</label>
            <input
              id="Taskname"
              className="mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
              value={form.Taskname}
              onChange={(e) => setForm({ ...form, Taskname: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              id="description"
              rows={4}
              className="mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                className="mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => router.push('/')} className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all duration-200 font-medium">Cancel</button>
            <button type="submit" className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
