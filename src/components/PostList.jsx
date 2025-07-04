import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';

const PostList = () => {
  const { data: posts, loading, error } = useApi('/posts');

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post._id} className="bg-white p-4 shadow rounded">
            <Link to={`/post/${post._id}`} className="text-xl font-semibold text-blue-600">
              {post.title}
            </Link>
            <p>{post.excerpt || post.content.substring(0, 100) + '...'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;