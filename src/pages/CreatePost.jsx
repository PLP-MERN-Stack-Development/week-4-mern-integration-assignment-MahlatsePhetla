
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';



export default function CreatePost() {
  const token = localStorage.getItem('token');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed to load categories');
        const data = await res.json();
        setCategories(data);
        if (data.length > 0) setCategoryId(data[0]._id);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!title || !content || !categoryId) {
      setError('Please fill in all required fields');
      return;
    }

    if (!token) {
      setError('You must be logged in to create a post.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', categoryId);
      if (image) {
        formData.append('image', image);
      }

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create post');
      }

      setSuccess(true);
      setTitle('');
      setContent('');
      setCategoryId(categories.length > 0 ? categories[0]._id : '');
      setImage(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-xl font-semibold mb-4">Create New Post</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">Post created successfully!</p>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium" htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          className="w-full border px-3 py-2 mb-4 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium" htmlFor="content">Content</label>
        <textarea
          id="content"
          className="w-full border px-3 py-2 mb-4 rounded"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium" htmlFor="category">Category</label>
        <select
          id="category"
          className="w-full border px-3 py-2 mb-4 rounded"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium" htmlFor="image">Image (optional)</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}
