// import React from 'react';
// import SearchBox from '../components/SearchBox';
// const SearchPage = () => (
//   <div className="search-page">
//     <h1>Search Page</h1>
//     {/* Add your search functionality here */}
//     <SearchBox/>
//   </div>
// );

// export default SearchPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import './SearchPage.css';

const SearchPage = () => {
  const [trackDetails, setTrackDetails] = useState(null);

  const handleSearch = (details) => {
    setTrackDetails(details);
  };

  return (
    <div className="search-page">
      <h1>Search by Track ID</h1>
      <SearchBox onSearch={handleSearch} />
      {trackDetails && (
        <div className="track-details">
          <Link to={`/song/${trackDetails.id}`}>
            <img src={trackDetails.album.images[0].url} alt={trackDetails.name} />
            <h2>{trackDetails.name}</h2>
            <p>Artist: {trackDetails.artists.map(artist => artist.name).join(', ')}</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
