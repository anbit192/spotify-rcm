// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SearchBoxRealTime from '../components/SearchBoxRealTime';

// const SearchByNamePage = () => {
//   const [searchResults, setSearchResults] = useState([]);

//   // Function to handle the search term and fetch data from Spotify API
//   const handleSearch = async (searchTerm) => {
//     if (!searchTerm) {
//       setSearchResults([]);
//       return;
//     }

//     try {
//       const accessToken = localStorage.getItem('accessToken');
//       if (!accessToken) {
//         console.error('Access token not found.');
//         return;
//       }

//       const response = await axios.get(
//         `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=10`, // Limit to 10 results
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       setSearchResults(response.data.tracks.items);
//     } catch (error) {
//       console.error('Error fetching data from Spotify API:', error);
//       setSearchResults([]);
//     }
//   };

//   return (
//     <div className="search-by-name-page">
//       <h1>Search by Song Name</h1>
//       <SearchBoxRealTime onSearch={handleSearch} />
//       <ul>
//         {searchResults.map((track) => (
//           <li key={track.id}>
//             {track.name} - {track.artists.map((artist) => artist.name).join(', ')}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SearchByNamePage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SearchBoxRealTime from '../components/SearchBoxRealTime';

// const SearchByNamePage = () => {
//   const [searchResults, setSearchResults] = useState([]);

//   // Function to handle the search term and fetch data from Spotify API
//   const handleSearch = async (searchTerm) => {
//     if (!searchTerm) {
//       setSearchResults([]);
//       return;
//     }

//     try {
//       const accessToken = localStorage.getItem('accessToken');
//       if (!accessToken) {
//         console.error('Access token not found.');
//         return;
//       }

//       const response = await axios.get(
//         `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=10`, // Limit to 10 results
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       setSearchResults(response.data.tracks.items);
//     } catch (error) {
//       console.error('Error fetching data from Spotify API:', error);
//       setSearchResults([]);
//     }
//   };

//   return (
//     <div className="search-by-name-page">
//       <h1>Search by Song Name</h1>
//       <SearchBoxRealTime onSearch={handleSearch} />
//       <ul>
//         {searchResults.map((track) => (
//           <li key={track.id}>
//             <img src={track.album.images[0].url} alt={track.name} width="50" height="50" />
//             {track.name} - {track.artists.map((artist) => artist.name).join(', ')}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SearchByNamePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBoxRealTime from '../components/SearchBoxRealTime';
import './SearchByNamePage.css'; // Import the CSS file

const SearchByNamePage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('Access token not found.');
        return;
      }

      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setSearchResults(response.data.tracks.items);
    } catch (error) {
      console.error('Error fetching data from Spotify API:', error);
      setSearchResults([]);
    }
  };

  return (
    <div className="search-by-name-page">
      <h1>Tìm kiếm bằng tên bài hát</h1>
      <SearchBoxRealTime onSearch={handleSearch} />
      <ul>
        {searchResults.map((track) => (
          <li key={track.id}>
            <Link to={`/song/${track.id}`}>
              <img src={track.album.images[0].url} alt={track.name} width="50" height="50" />
              {track.name} - {track.artists.map((artist) => artist.name).join(', ')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchByNamePage;

