import React from 'react';
import { User, Track } from '../types';
import { useSprings, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface SwipeCardProps {
  user: User;
  onSwipe: (liked: boolean) => void;
  topTracks: Track[];
  recentTracks: Track[];
}

const SwipeCard: React.FC<SwipeCardProps> = ({ user, onSwipe, topTracks, recentTracks }) => {
  const [props, api] = useSprings(1, i => ({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
  }));

  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) {
        onSwipe(dir === 1);
      }
      api.start(() => ({
        x: down ? mx : 0,
        scale: down ? 1.1 : 1,
        rotation: mx / 10,
        immediate: name => name === 'x' || name === 'rotation',
      }));
    },
    { axis: 'x' }
  );

  return (
    <animated.div
      {...bind()}
      style={{
        ...props[0],
        touchAction: 'none',
      }}
      className="w-64 h-96 bg-white rounded-lg shadow-xl flex flex-col p-4"
    >
      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <p className="mb-4">Age: {user.age}</p>
      <h3 className="font-semibold mb-2">Top Tracks:</h3>
      <ul className="mb-4">
        {topTracks.slice(0, 3).map(track => (
          <li key={track.id}>{track.name} - {track.artist}</li>
        ))}
      </ul>
      <h3 className="font-semibold mb-2">Recently Played:</h3>
      <ul>
        {recentTracks.slice(0, 3).map(track => (
          <li key={track.id}>{track.name} - {track.artist}</li>
        ))}
      </ul>
    </animated.div>
  );
};

export default SwipeCard;