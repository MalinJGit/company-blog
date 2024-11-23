import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import AddPost from './AddPost';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import BlogPosts from './Blog-posts';
import EditPost from './EditPost';
import Footer from './Components/Footer';


function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location =useLocation();
  const isHomePage = location.pathname === '/';
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
    <>
      <div className="App">
        <Navbar />
        {isHomePage && <Header />}
        <h1 className="company-name">InnovativeX</h1>
        <Routes>
          <Route path="/" element={<BlogPosts posts={posts} onEdit={handlePostAdded} />} /> {/* Startsidan med blogginlägg */}
          <Route path="/add" element={<AddPost onPostAdded={handlePostAdded} />} /> {/* Lägg till inlägg */}
          <Route path="/edit/:postId" element={<EditPost />} /> {/* Redigera inlägg */}
        </Routes>
      </div>
      <Footer />
      </>
  );
}

export default App;
