import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 5;

  useEffect(() => {
    async function fetchMyPosts() {
      try {
        const res = await fetch('/api/posts/my-posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch posts');
        setMyPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMyPosts();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete post');

      setMyPosts(prev => prev.filter(post => post._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredPosts = myPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <Link
          to="/create-post"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Posts</p>
          <p className="text-2xl font-bold">{myPosts.length}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Active Categories</p>
          <p className="text-2xl font-bold">
            {[...new Set(myPosts.map(p => p.category?.name))].length}
          </p>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border px-3 py-2 mb-4 rounded"
      />

      {/* Posts List */}
      {loading ? (
        <p>Loading your posts...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-gray-500">No matching posts found.</p>
      ) : (
        paginatedPosts.map(post => (
          <div key={post._id} className="border-b py-4">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-sm text-gray-600">
              {new Date(post.createdAt).toLocaleDateString()} &middot; {post.category?.name}
            </p>

            <div className="space-x-4 mt-2">
              <Link
                to={`/edit-post/${post._id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages).keys()].map(num => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === num + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}