import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import Tutorial from './components/Tutorial';
import SpotifyLogin from './components/SpotifyLogin';
import MainApp from './components/MainApp';
import Profile from './components/Profile';
import Callback from './components/Callback';
import BottomNavigation from './components/BottomNavigation';
import { User } from './types';
import { fetchUserProfile } from './services/spotifyApi';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token');
    if (token) {
      fetchUserProfile().then(setCurrentUser);
    }
    const tutorialShown = localStorage.getItem('tutorial_shown');
    if (tutorialShown) {
      setShowTutorial(false);
    }
  }, []);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem('tutorial_shown', 'true');
  };

  return (
    <Router>
      <div className="h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col">
        <Routes>
          <Route path="/" element={!currentUser ? <Welcome /> : <Navigate to="/app" />} />
          <Route
            path="/tutorial"
            element={
              showTutorial ? (
                <Tutorial onComplete={handleTutorialComplete} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<SpotifyLogin />} />
          <Route path="/callback" element={<Callback />} />
          <Route
            path="/app"
            element={currentUser ? <MainApp user={currentUser} /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={currentUser ? <Profile user={currentUser} /> : <Navigate to="/login" />}
          />
        </Routes>
        {currentUser && (
          <BottomNavigation />
        )}
      </div>
    </Router>
  );
}

export default App;