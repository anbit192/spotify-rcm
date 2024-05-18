
// import React, { useState } from 'react';
// import axios from 'axios';
// import './RecommendationButtonByUs.css'; 

// const RecommendationButtonByUs = ({ id, accessToken, onGetTrackFeatures }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleClick = async () => {
//     setIsLoading(true);
//     try {
//       // Step 1: Get track features from Spotify API
//       const spotifyResponse = await axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       const trackFeatures = spotifyResponse.data;
//       onGetTrackFeatures(trackFeatures);
     
//       const localApiEndpoint = 'http://127.0.0.1:8000/recommend';
//       const localResponse = await axios.post(localApiEndpoint, trackFeatures);
//       const trackIds = localResponse.data.id; // Extract the list of track IDs
      
      

//       // Step 4: Embed players for each track ID
//       embedPlayers(trackIds);
//     } catch (error) {
//       console.error('Error fetching track features or posting to local API:', error);
      
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const embedPlayers = (trackIds) => {
//     const playerContainer = document.getElementById('player-container');
//     playerContainer.innerHTML = ''; // Clear previous players
//     trackIds.forEach(trackId => {
//       const iframe = document.createElement('iframe');
//       iframe.src = `https://open.spotify.com/embed/track/${trackId}`;
//       iframe.width = '300';
//       iframe.height = '80';
//       iframe.frameBorder = '0';
//       iframe.allowTransparency = 'true';
//       iframe.allow = 'encrypted-media';
//       playerContainer.appendChild(iframe);
//     });
//   };

//   return (
//     <div>
//       <button onClick={handleClick} disabled={isLoading}>
//         {isLoading ? 'Loading...' : 'Get Recommend By Us'}
//       </button>
//       <div id="player-container"></div>
//     </div>
//   );
// };

// export default RecommendationButtonByUs;

// RecommendationButtonByUs.js

// RecommendationButtonByUs.js

import React, { useState } from 'react';
import axios from 'axios';
import './RecommendationButtonByUs.css'; // Import CSS file

const RecommendationButtonByUs = ({ id, accessToken, onGetTrackFeatures }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      // Step 1: Get track features from Spotify API
      const spotifyResponse = await axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const trackFeatures = spotifyResponse.data;
      onGetTrackFeatures(trackFeatures);
     
      const localApiEndpoint = 'http://127.0.0.1:8000/recommend';
      const localResponse = await axios.post(localApiEndpoint, trackFeatures);
      const trackIds = localResponse.data.id; // Extract the list of track IDs
      
      // Step 4: Embed players for each track ID
      embedPlayers(trackIds);
    } catch (error) {
      console.error('Error fetching track features or posting to local API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const embedPlayers = (trackIds) => {
    const playerContainer = document.getElementById('player-container');
    playerContainer.innerHTML = ''; // Clear previous players
    trackIds.forEach(trackId => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://open.spotify.com/embed/track/${trackId}`;
      iframe.width = '300';
      iframe.height = '80';
      iframe.frameBorder = '0';
      iframe.allowTransparency = 'true';
      iframe.allow = 'encrypted-media';
      playerContainer.appendChild(iframe);
    });
  };

  return (
    <div className="container"> {/* Container with centered content */}
      <button className="button" onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Recommend By Us'}
      </button>
      <div id="player-container"></div>
    </div>
  );
};

export default RecommendationButtonByUs;

