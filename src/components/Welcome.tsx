import React from 'react';
import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';

const Welcome: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 text-white">
      <Music size={64} className="mb-4" />
      <h1 className="text-4xl font-bold mb-4">Welcome to MelodyMatch</h1>
      <p className="text-xl mb-8 text-center">Find your perfect match through the power of music!</p>
      <Link
        to="/tutorial"
        className="bg-white text-purple-500 font-bold py-2 px-4 rounded-full text-lg"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Welcome;