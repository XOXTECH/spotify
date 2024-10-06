import React, { useState } from 'react';
import { User } from '../types';
import { mockUpdateUserProfile as updateUserProfile } from '../services/databaseService';

const Profile: React.FC<{ user: User }> = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [bio, setBio] = useState(user.bio || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile(user.id, { name, age, bio });
    alert('Profile updated successfully!');
  };

  return (
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 shadow-xl">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-full hover:bg-purple-600"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;