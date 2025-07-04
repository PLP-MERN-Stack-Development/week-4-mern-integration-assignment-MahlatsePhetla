import React from 'react';
import useForm from '../hooks/useForm';

const PostForm = () => {
  const { values, handleChange, resetForm } = useForm({ title: '', content: '' });

  
  return (
    <form>
      <input
        name="title"
        value={values.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleChange}
        placeholder="Content"
      />
      <button type="button" onClick={resetForm}>Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
