// // SearchBox.js
// import React, { useState } from 'react';

// const SearchBox = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await onSearch(searchTerm);
//     } catch (error) {
//       console.error('Error searching:', error);
//       alert('stupid')
//     }
//   };
  

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={handleChange}
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// };

// export default SearchBox;

// SearchBox.js
// SearchBox.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchBox = ({ onSearch }) => {
  const [trackId, setTrackId] = useState('');

  const handleChange = (event) => {
    setTrackId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Retrieve audio features of the track using the user-provided track ID
      const audioFeatures = await getAudioFeatures(trackId);

      // Pass the audio features data to the parent component
      onSearch(audioFeatures);
    } catch (error) {
      console.error('Error retrieving audio features:', error);
      alert('An error occurred while retrieving audio features. Please try again.');
    }
  };

  // Function to retrieve audio features of a track from Spotify API
  const getAudioFeatures = async (trackId) => {
    try {
      // Retrieve access token from local storage
      const accessToken = localStorage.getItem('accessToken');

      // If access token is not available, handle the error
      if (!accessToken) {
        throw new Error('Access token not found.');
      }

      // Configure Axios request headers with the access token
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
      };

      // Make a request to Spotify API to get audio features of the track
      const response = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, headers);

      // Return the audio features data
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error getting audio features:', error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Track ID..."
        value={trackId}
        onChange={handleChange}
      />
      <button type="submit">Get Audio Features</button>
    </form>
  );
};

export default SearchBox;
