import React, { useState } from 'react';
import axios from 'axios';

const RecommendationButton = ({ trackId, accessToken, onRecommendation }) => {
  const handleRecommendation = async () => {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${trackId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Pass the recommended tracks to the parent component
      onRecommendation(response.data.tracks);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <button onClick={handleRecommendation}>Get recommendations by Spotify API</button>
  );
};

export default RecommendationButton;
