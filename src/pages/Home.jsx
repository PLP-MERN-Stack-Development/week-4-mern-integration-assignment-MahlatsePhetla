import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`/api/posts?search=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err.message);
      }
    }

    fetchPosts();
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
  };

  return (
    <div>
      <HeroSection />

      {/* Intro Section */}
      <div className="text-center py-10 px-4">
        <h2 className="text-2xl font-semibold mb-2">Start Your Developer Journey</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Join a community of developers sharing their thoughts, tutorials, and experiences.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Search posts by title or content..."
            className="flex-grow border px-3 py-2 rounded"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      {/* Blog Posts */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold mb-4">Latest Posts</h2>

        {posts.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="mb-6 border-b pb-4">
              <Link
                to={`/posts/${post._id}`}
                className="text-2xl text-blue-600 font-semibold hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-gray-600 text-sm">by {post.author?.name || 'Unknown'}</p>
              <p className="text-gray-700 mt-2">{post.content.slice(0, 150)}...</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
