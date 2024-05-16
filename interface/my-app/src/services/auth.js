import axios from 'axios';
import qs from 'qs';

export const getAuth = async () => {
  const clientId = 'e2fcd2c9bf8b4375985e196dbfe26ddb';
  const clientSecret = 'fda136a2700247098401b43c3d344ff5';
  
  const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
  };
  const data = {
    grant_type: 'client_credentials',
  };

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      headers
    );
    return response.data.access_token;
  } catch (error) {
    console.log('Error retrieving access token:', error);
    throw error; // Re-throw the error for handling by the caller
  }
};
