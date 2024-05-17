// import React from 'react';

// const SongDetailsPage = () => (
//   <div className="song-details-page">
//     <h1>Song Details Page test</h1>
//     {/* Add your song details display here */}
//   </div>
// );

// export default SongDetailsPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SongDetailsPage = () => {
  const { id } = useParams();
  const [trackDetails, setTrackDetails] = useState(null);

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
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
  }, [id]);

  if (!trackDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="song-details-page">
      <h1>{trackDetails.name}</h1>
      <p>Artist: {trackDetails.artists.map((artist) => artist.name).join(', ')}</p>
      <p>Album: {trackDetails.album.name}</p>
      <img src={trackDetails.album.images[0].url} alt={trackDetails.name} />
      {/* Add more details as needed */}
    </div>
  );
};

export default SongDetailsPage;
