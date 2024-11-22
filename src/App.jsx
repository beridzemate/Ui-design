import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Features from './components/Features.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Highlights from './components/Highlights.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Iphone from './components/Iphone.jsx';
import Lights from './components/Lights.jsx';
import Loader from './components/Loader.jsx';
import Model from './components/Model.jsx';
import ModelView from './components/ModelView.jsx';
import Navbar from './components/Navbar.jsx';
import VideoCarousel from './components/VideoCarousel.jsx';

// Import your constants and utils
import { animateWithGsap } from './utils/animation.js'; 
import { constants } from './constants/index.js'; 

  function fetchWithDelay(url, delay) {
    return new Promise(resolve => setTimeout(() => resolve(fetch(url)), delay));
  }
  
  fetchWithDelay('https://jsonplaceholder.typicode.com/posts', 2000)
    .then(response => response.json())
    .then(data => {
      console.log('Data fetched after delay:', data);
    })
    .catch(error => console.error('Error:', error));
  


const App = () => {
  return (
    <Router>
      <Navbar /> {/* Always show Navbar */}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/features" element={<Features />} />
        <Route path="/highlights" element={<Highlights />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/iphone" element={<Iphone />} />
        <Route path="/lights" element={<Lights />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/model" element={<Model />} />
        <Route path="/model-view" element={<ModelView />} />
        <Route path="/video-carousel" element={<VideoCarousel />} />
        {/* Add more routes as needed */}
      </Routes>

      <Footer /> {/* Footer can be static on every page */}
    </Router>
  );
}

export default App;
