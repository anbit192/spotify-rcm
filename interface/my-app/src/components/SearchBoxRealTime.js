// import React, { useState, useEffect } from 'react';

// const SearchBoxRealTime = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       onSearch(searchTerm);
//     }, 300); // Add a delay to reduce the number of API calls

//     return () => clearTimeout(delayDebounceFn);
//   }, [searchTerm, onSearch]);

//   const handleChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search for a song..."
//         value={searchTerm}
//         onChange={handleChange}
//       />
//     </div>
//   );
// };

// export default SearchBoxRealTime;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 5px;
  width: 300px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1db954; /* Spotify green */
    outline: none;
  }
`;

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
    <Container>
      <Input
        type="text"
        placeholder="Nhập tên bài hát..."
        value={searchTerm}
        onChange={handleChange}
      />
    </Container>
  );
};

export default SearchBoxRealTime;
