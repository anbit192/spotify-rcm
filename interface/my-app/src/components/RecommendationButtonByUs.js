
// import React, { useState } from 'react';
// import axios from 'axios';

// const RecommendationButtonByUs = ({ id, accessToken, onGetTrackFeatures }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleClick = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       onGetTrackFeatures(response.data);
//     } catch (error) {
//       console.error('Error fetching track features:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <button onClick={handleClick} disabled={isLoading}>
//       {isLoading ? 'Loading...' : 'Get Recommendation By Us'}
//     </button>
//   );
// };

// export default RecommendationButtonByUs;
import React, { useState } from 'react';
import axios from 'axios';

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

      // Step 2: Map track features to match the AudioFeatures model in FastAPI
      const mappedFeatures = {
        acousticness: trackFeatures.acousticness,
        danceability: trackFeatures.danceability,
        duration_ms: trackFeatures.duration_ms,
        energy: trackFeatures.energy,
        instrumentalness: trackFeatures.instrumentalness,
        key: trackFeatures.key,
        liveness: trackFeatures.liveness,
        loudness: trackFeatures.loudness,
        mode: trackFeatures.mode,
        speechiness: trackFeatures.speechiness,
        tempo: trackFeatures.tempo,
        time_signature: trackFeatures.time_signature,
        valence: trackFeatures.valence
      };
      

      // Step 3: Post mapped track features to local API and get track IDs
      console.log(`map`, mappedFeatures)
      const localApiEndpoint = 'http://127.0.0.1:8000/recommend';
      const localResponse = await axios.get(localApiEndpoint, mappedFeatures);
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
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Track Features'}
      </button>
      <div id="player-container"></div>
    </div>
  );
};

export default RecommendationButtonByUs;
