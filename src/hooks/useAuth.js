import React from 'react';
import { useAuth } from '../context/AuthContext';

function CreatePost() {
  const { user } = useAuth(); 
  return <div>Hello, {user?.username}</div>;
}

export default CreatePost;
