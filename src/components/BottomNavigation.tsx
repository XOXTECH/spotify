import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, MessageCircle } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg">
      <ul className="flex justify-around py-2">
        <li>
          <Link to="/app" className={`p-2 ${location.pathname === '/app' ? 'text-purple-500' : 'text-gray-500'}`}>
            <Home />
          </Link>
        </li>
        <li>
          <Link to="/matches" className={`p-2 ${location.pathname === '/matches' ? 'text-purple-500' : 'text-gray-500'}`}>
            <MessageCircle />
          </Link>
        </li>
        <li>
          <Link to="/profile" className={`p-2 ${location.pathname === '/profile' ? 'text-purple-500' : 'text-gray-500'}`}>
            <User />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNavigation;