
import React, { useState } from 'react';
import axios from 'axios';

const RecommendationButtonByUs = ({ id, accessToken, onGetTrackFeatures }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      onGetTrackFeatures(response.data);
    } catch (error) {
      console.error('Error fetching track features:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Get Recommendation By Us'}
    </button>
  );
};

export default RecommendationButtonByUs;
