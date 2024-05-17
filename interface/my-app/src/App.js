
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SongDetailsPage from './pages/SongDetailsPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import { getAuth } from './services/auth';


function App() {
  
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storeAccessToken = async () => {
      try {
        const token = await getAuth();
        localStorage.setItem('accessToken', token); // Store access token in local storage
        setAccessToken(token);
        console.log('Access token stored:', token);
      } catch (error) {
        setError(error);
        console.error('Error retrieving access token:', error);
      }
    };

    storeAccessToken();
  }, []);


  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/song/:id" element={<SongDetailsPage />} />
        </Routes>
        <Footer />
      </Router>
      {/* {accessToken ? (
        <p>Access token obtained: {accessToken}</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
}

export default App;
