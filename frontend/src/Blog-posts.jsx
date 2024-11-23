import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import { useNavigate } from 'react-router-dom';

function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/posts')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (postId) => {
    console.log("Deleting post with ID:", postId);
  
    axios.delete(`http://localhost:4000/api/posts/${postId}`)
      .then(() => {
        setPosts(posts.filter(post => post.id !== postId));
      })
      .catch(error => {
        console.error('Error deleting post:', error);
        setError("Det gick inte att radera inlägget.");
      });
  };
  

  if (loading) {
    return <p>Laddar...</p>;
  }

  if (error) {
    return <p>Det gick inte att hämta inlägg.</p>;
  }

  const handleEdit = (postId) => {
    console.log(`Edit post with ID: ${postId}`);
    navigate(`/edit/${postId}`);
  };

  return (
    <div>
    {posts.map(post => (
  <Post
    key={post.id}
    title={post.title}
    content={post.content}
    imageUrl={post.image_url}
    onEdit={() => handleEdit(post.id)}
    onDelete={() => handleDelete(post.id)}
  />
))}
  </div>
);
}

export default BlogPosts;
