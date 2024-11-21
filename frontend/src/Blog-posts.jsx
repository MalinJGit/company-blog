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
    console.log("Deleting post with ID:", postId); // Kontrollera att rätt ID används
  
    axios.delete(`http://localhost:4000/api/posts/${postId}`)
      .then(() => {
        // Filtrera bort endast det valda inlägget från `posts`-arrayen
        setPosts(posts.filter(post => post.id !== postId));
      })
      .catch(error => {
        console.error('Error deleting post:', error);
        setError("Det gick inte att radera inlägget."); // Specificera meddelandet
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
    navigate(`/edit/${postId}`); // Navigerar till redigeringssidan med postId
  };

  return (
    <div>
    <h1>Blogginlägg</h1>
    {posts.map(post => (
  <Post
    key={post.id}
    title={post.title}
    content={post.content}
    imageUrl={post.image_url} // skicka den specifika bild-URL:en
    onEdit={() => handleEdit(post.id)}
    onDelete={() => handleDelete(post.id)}
  />
))}
  </div>
);
}

export default BlogPosts;
