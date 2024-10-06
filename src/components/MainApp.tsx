import React, { useState, useEffect } from 'react';
import { User, Track } from '../types';
import { fetchTopTracks, fetchRecentlyPlayed } from '../services/spotifyApi';
import { mockFetchPotentialMatches as fetchPotentialMatches, mockSaveSwipe as saveSwipe } from '../services/databaseService';
import SwipeCard from './SwipeCard';

const MainApp: React.FC<{ user: User }> = ({ user }) => {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [potentialMatches, setPotentialMatches] = useState<User[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  useEffect(() => {
    fetchTopTracks().then(setTopTracks);
    fetchRecentlyPlayed().then(setRecentTracks);
    fetchPotentialMatches(user.id).then(setPotentialMatches);
  }, [user.id]);

  const handleSwipe = async (liked: boolean) => {
    if (currentMatchIndex < potentialMatches.length) {
      const swipedUser = potentialMatches[currentMatchIndex];
      await saveSwipe(user.id, swipedUser.id, liked);
      setCurrentMatchIndex(currentMatchIndex + 1);
    }
  };

  const currentMatch = potentialMatches[currentMatchIndex];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      {currentMatch ? (
        <SwipeCard
          user={currentMatch}
          onSwipe={handleSwipe}
          topTracks={topTracks}
          recentTracks={recentTracks}
        />
      ) : (
        <p className="text-white text-xl">No more matches available</p>
      )}
    </div>
  );
};

export default MainApp;