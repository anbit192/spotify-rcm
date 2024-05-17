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
import SearchBox from '../components/SearchBox';

const SearchPage = () => {
  const [audioFeatures, setAudioFeatures] = useState(null);

  // Function to handle the retrieved audio features data
  const handleSearch = (audioFeaturesData) => {
    setAudioFeatures(audioFeaturesData);
  };

  return (
    <div className="search-page">
      <h1>Search Page</h1>
      {/* Pass the handleSearch function to the SearchBox component */}
      <SearchBox onSearch={handleSearch} />
      {/* Render audio features data or any other components */}
    </div>
  );
};

export default SearchPage;