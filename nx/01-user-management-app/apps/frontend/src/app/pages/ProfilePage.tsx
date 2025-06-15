import React, { useState } from 'react';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState({
    picture: 'https://via.placeholder.com/150',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Springfield',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteAccount = () => {
    // Logic for deleting the account
    console.log('Account deleted');
  };

  const handleSignOut = () => {
    // Logic for signing out
    console.log('Signed out');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="flex flex-col items-center">
          <img
            src={profile.picture}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <input
            type="text"
            name="picture"
            value={profile.picture}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            placeholder="Profile Picture URL"
          />
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            placeholder="Name"
          />
          <p className="text-gray-600 mb-4">{profile.email}</p>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            placeholder="Phone"
          />
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            placeholder="Address"
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Account
          </button>
          <button
            onClick={handleSignOut}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
