// import React, { useState } from 'react';
// import axios from 'axios';

// const RecommendationButton = ({ trackId, accessToken, onRecommendation }) => {
//   const handleRecommendation = async () => {
//     try {
//       const response = await axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${trackId}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       // Pass the recommended tracks to the parent component
//       onRecommendation(response.data.tracks);
//     } catch (error) {
//       console.error('Error fetching recommendations:', error);
//     }
//   };

//   return (
//     <button onClick={handleRecommendation}>Get recommendations by Spotify API</button>
//   );
// };

// export default RecommendationButton;
import React from 'react';
import axios from 'axios';
import './RecommendationButton.css'; // Import the CSS file

const RecommendationButton = ({ trackId, accessToken, onRecommendation }) => {
  const handleClick = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/recommendations?seed_tracks=${trackId}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      onRecommendation(response.data.tracks);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="recommendation-button">
      <button onClick={handleClick}>Gợi ý bằng Spotify API</button>
    </div>
  );
};

export default RecommendationButton;
