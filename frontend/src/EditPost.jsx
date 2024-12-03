import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './post-styling.css';

function EditPost() {
  const { postId } = useParams();
  const [post, setPost] = useState({ title: '', content: '', image_url: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //Hämta inlägg
  useEffect(() => {
    axios.get(`/api/posts/${postId}`)
      .then(response => {
        setPost(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setError("Det gick inte att hämta inlägget.");
        setLoading(false);
      });
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); 

    //Uppdatera inlägg
    axios.put(`/api/posts/${postId}`, post)
      .then(() => {
        navigate('/'); 
      })
      .catch(error => {
        console.error('Error updating post:', error);
        setError("Det gick inte att uppdatera inlägget.");
      });
  };

  const handleDelete = () => {
    setError(null);

    axios.delete(`/api/posts/${postId}`)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Error deleting post:', error);
        setError("Det gick inte att radera inlägget.");
      });
  };

  if (loading) {
    return <p>Laddar...</p>;
  }

  return (
    <div className="edit-post-container">
      <h2>Ändra inlägg</h2>
      {error && <p className="error">{error}</p>}
      <form className="edit-post-form" onSubmit={handleSubmit}>
        <label>Titel:</label>
        <input 
          type="text" 
          className="edit-post-input"
          value={post.title} 
          onChange={(e) => setPost({ ...post, title: e.target.value })} 
          required 
        />
        <label>Bild-URL:</label>
        <input 
          type="text" 
          className="edit-post-input"
          value={post.image_url} 
          onChange={(e) => setPost({ ...post, image_url: e.target.value })} 
          placeholder="Bild-URL"
        />
        <label>Innehåll:</label>
        <textarea 
          className="edit-post-textarea"
          value={post.content} 
          onChange={(e) => setPost({ ...post, content: e.target.value })} 
          required 
        />
        <div class="button-container-edit">
        <button type="submit" className="edit-post-button">Spara</button>
        <button type="button" className="edit-delete-button" onClick={handleDelete}>Radera inlägg</button>
        </div>
      </form>
    </div>
  );  
}

export default EditPost;
