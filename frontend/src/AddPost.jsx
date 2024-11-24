import { useState } from 'react';
import axios from 'axios';

function AddPost({ onPostAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title,
      content,
      image_url: imageUrl,
    };

    axios.post(`${backendUrl}/api/posts`, newPost)
      .then((response) => {
        onPostAdded(response.data); // Call the function to update posts in App
        setTitle('');
        setContent('');
        setImageUrl('');
      })
      .catch((error) => {
        console.error('Error adding post:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="add-post-form">
      <h2>Lägg till nytt inlägg</h2>
      <input 
        type="text" 
        placeholder="Titel" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Innehåll" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Bild-URL" 
        value={imageUrl} 
        onChange={(e) => setImageUrl(e.target.value)} 
      />
      <button type="submit">Lägg till inlägg</button>
    </form>
  );
}

export default AddPost;