import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Music, Heart, User } from 'lucide-react';

const tutorialSteps = [
  {
    icon: <Music size={48} />,
    title: 'Connect with Spotify',
    description: 'Link your Spotify account to share your music taste.',
  },
  {
    icon: <Heart size={48} />,
    title: 'Find Matches',
    description: 'Swipe through potential matches based on musical compatibility.',
  },
  {
    icon: <User size={48} />,
    title: 'Create Your Profile',
    description: 'Customize your profile to show off your personality.',
  },
];

const Tutorial: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
      navigate('/login');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = tutorialSteps[currentStep];

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 text-white">
      <div className="mb-8">{step.icon}</div>
      <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
      <p className="text-center mb-8">{step.description}</p>
      <div className="flex justify-between w-full">
        <button
          onClick={handlePrev}
          className={`p-2 rounded-full ${currentStep === 0 ? 'invisible' : ''}`}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="bg-white text-purple-500 font-bold py-2 px-4 rounded-full"
        >
          {currentStep === tutorialSteps.length - 1 ? 'Get Started' : 'Next'}
        </button>
        <div className="w-10"></div>
      </div>
    </div>
  );
};

export default Tutorial;