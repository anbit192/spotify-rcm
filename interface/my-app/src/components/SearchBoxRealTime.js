import React, { useState, useEffect } from 'react';

const SearchBoxRealTime = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); // Add a delay to reduce the number of API calls

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a song..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBoxRealTime;
