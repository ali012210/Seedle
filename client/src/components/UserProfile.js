import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { userProfileService } from '../services/userProfileService';
import './UserProfile.css'; // Assuming you have CSS for styling

const UserProfile = () => {
  const { user } = useContext(AuthContext); // Assuming this contains user info including ID
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        setLoading(true);
        try {
          const data = await userProfileService.fetchUserProfile(user.id);
          setProfileData(data);
        } catch (err) {
          setError('Unable to fetch profile data. Please try again later.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    }
  }, [user]);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!profileData) return <div>No profile data found.</div>;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {profileData.picture && (
        <div className="profile-picture">
          <img src={profileData.picture} alt="Profile" />
        </div>
      )}
      <div className="profile-info">
        <p><strong>Name:</strong> {profileData.name}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Bio:</strong> {profileData.bio || 'No bio provided.'}</p>
        {/* Add more personal information here */}
      </div>
      {/* Extend with more user-specific sections like posts, comments, etc. */}
    </div>
  );
};

export default UserProfile;
