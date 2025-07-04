import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <Link to={`/post/${post._id}`} className="text-xl font-semibold text-blue-600">
        {post.title}
      </Link>
      <p className="text-gray-600">{post.excerpt || post.content.substring(0, 100) + '...'}</p>
    </div>
  );
};

export default PostCard;