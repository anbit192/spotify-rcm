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
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const trackId = extractTrackId(inputValue);

      // Retrieve track details using the extracted track ID
      const trackDetails = await getTrackDetails(trackId);

      // Pass the track details data to the parent component
      onSearch(trackDetails);
    } catch (error) {
      console.error('Error retrieving track details:', error);
      alert('An error occurred while retrieving track details. Please try again.');
    }
  };

  // Function to extract the track ID from a Spotify URL or plain track ID
  const extractTrackId = (input) => {
    const regex = /(?:spotify:track:|https:\/\/open\.spotify\.com\/track\/|\/track\/)([a-zA-Z0-9]{22})/;
    const match = input.match(regex);
    return match ? match[1] : input;
  };

  // Function to retrieve track details from Spotify API
  const getTrackDetails = async (trackId) => {
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

      // Make a request to Spotify API to get track details
      const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, headers);

      // Return the track details data
      return response.data;
    } catch (error) {
      console.error('Error getting track details:', error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Track URL or ID..."
        value={inputValue}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBox;
