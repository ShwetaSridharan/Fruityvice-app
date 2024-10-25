import axios from 'axios';

const AWS_LAMBDA_URL = "https://wcz3qr33kmjvzotdqt65efniv40kokon.lambda-url.us-east-2.on.aws";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await axios.get(AWS_LAMBDA_URL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error);
    
    if (axios.isAxiosError(error)) {
      return res.status(error.response?.status || 500).json({
        error: error.message,
        details: error.response?.data
      });
    }
    
    return res.status(500).json({
      error: 'An unexpected error occurred'
    });
  }
}