import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import "../style.css";
import AddPost from './AddPost';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import BlogPosts from './Blog-posts';
import EditPost from './EditPost';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handlePostAdded = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<BlogPosts posts={posts} onEdit={handlePostAdded} />} /> {/* Startsidan med blogginlägg */}
          <Route path="/add" element={<AddPost onPostAdded={handlePostAdded} />} /> {/* Lägg till inlägg */}
          <Route path="/edit/:postId" element={<EditPost />} /> {/* Redigera inlägg */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
