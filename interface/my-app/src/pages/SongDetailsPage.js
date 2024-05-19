// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import RecommendationButton from '../components/RecommendationButton';
// import RecommendationButtonByUs from '../components/RecommendationButtonByUs'; // Import the new button component
// import './SongDetailsPage.css'; // Import the CSS file

// const SongDetailsPage = () => {
//   const { id } = useParams();
//   const [trackDetails, setTrackDetails] = useState(null);
//   const [recommendedTracks, setRecommendedTracks] = useState([]);
//   const accessToken = localStorage.getItem('accessToken');

//   useEffect(() => {
//     const fetchTrackDetails = async () => {
//       try {
//         if (!accessToken) {
//           console.error('Access token not found.');
//           return;
//         }

//         const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         setTrackDetails(response.data);
//       } catch (error) {
//         console.error('Error fetching track details:', error);
//       }
//     };

//     fetchTrackDetails();
//   }, [id, accessToken]);

//   const handleRecommendation = (recommendedTracks) => {
//     setRecommendedTracks(recommendedTracks);
//   };

//   if (!trackDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="song-details-page">
//       <h1>{trackDetails.name}</h1>
//       <p>Artist: {trackDetails.artists.map((artist) => artist.name).join(', ')}</p>
//       <p>Album: {trackDetails.album.name}</p>
//       <img src={trackDetails.album.images[0].url} alt={trackDetails.name} />
      
//       {/* Embed Spotify player for the selected track */}
//       <iframe
//         src={`https://open.spotify.com/embed/track/${trackDetails.id}`}
//         width="300"
//         height="80"
//         frameBorder="0"
//         allowtransparency="true"
//         allow="encrypted-media"
//       ></iframe>
      
//       {/* Render the recommendation buttons */}
//       <div className="recommendation-buttons">
//         <RecommendationButton 
//           trackId={id}
//           accessToken={accessToken}
//           onRecommendation={handleRecommendation}
//         />
//         <RecommendationButtonByUs 
//           id={id}
//           accessToken={accessToken}
//           onRecommendation={handleRecommendation}
//         />
//       </div>

//       {/* Display the recommended tracks */}
//       <h2>Recommended Tracks</h2>
//       <ul className="recommended-tracks">
//         {recommendedTracks.map((track) => (
//           <li key={track.id}>
//             <iframe
//               src={`https://open.spotify.com/embed/track/${track.id}`}
//               width="300"
//               height="80"
//               frameBorder="0"
//               allowtransparency="true"
//               allow="encrypted-media"
//             ></iframe>
//             <p>{track.name} - {track.artists.map((artist) => artist.name).join(', ')}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SongDetailsPage;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RecommendationButton from '../components/RecommendationButton';
import RecommendationButtonByUs from '../components/RecommendationButtonByUs'; 
import './SongDetailsPage.css';

const SongDetailsPage = () => {
  const { id } = useParams();
  const [trackDetails, setTrackDetails] = useState(null);
  const [trackFeatures, setTrackFeatures] = useState(null);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        if (!accessToken) {
          console.error('Access token not found.');
          return;
        }

        const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setTrackDetails(response.data);
      } catch (error) {
        console.error('Error fetching track details:', error);
      }
    };

    fetchTrackDetails();
  }, [id, accessToken]);

  const handleRecommendation = (recommendedTracks) => {
    console.log('Received recommended tracks:', recommendedTracks);
    setRecommendedTracks(recommendedTracks);
  };

  const handleGetTrackFeatures = (trackFeatures) => {
    console.log('Received track features:', trackFeatures);
    setTrackFeatures(trackFeatures);
  };
  
  

  if (!trackDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="song-details-page">
      <h1>{trackDetails.name}</h1>
      <p>Artist: {trackDetails.artists.map((artist) => artist.name).join(', ')}</p>
      <p>Album: {trackDetails.album.name}</p>
      <img src={trackDetails.album.images[0].url} alt={trackDetails.name} />
      
      <iframe
        src={`https://open.spotify.com/embed/track/${trackDetails.id}`}
        width="300"
        height="80"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
      
      <div className="recommendation-buttons">
        <RecommendationButton 
          trackId={id}
          accessToken={accessToken}
          onRecommendation={handleRecommendation}
        />
        <RecommendationButtonByUs 
          id={id}
          accessToken={accessToken}
          onGetTrackFeatures={handleGetTrackFeatures}
        />
      </div>

      {/* Display track features */}
        
      {trackFeatures && (
        <div>
          <h2>Một số đặc trưng của bài</h2>
          <p>Danceability: {trackFeatures.danceability}</p>
          <p>Energy: {trackFeatures.energy}</p>
          <p>Key: {trackFeatures.key}</p>
          {/* Display other track features as needed */}
        </div>
      )}

      {/* Display recommended tracks */}
      <h2>Gợi ý thông qua Spotify API</h2>
      <ul className="recommended-tracks">
        {recommendedTracks.map((track) => (
          <li key={track.id}>
            <iframe
              src={`https://open.spotify.com/embed/track/${track.id}`}
              width="300"
              height="80"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
            <p>{track.name} - {track.artists.map((artist) => artist.name).join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongDetailsPage;
