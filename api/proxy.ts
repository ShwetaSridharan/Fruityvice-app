import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const AWS_LAMBDA_URL = "https://wcz3qr33kmjvzotdqt65efniv40kokon.lambda-url.us-east-2.on.aws";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
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
    res.status(200).end();
    return;
  }

  try {
    // Simple forward to AWS Lambda URL
    const response = await axios.get(AWS_LAMBDA_URL);
    
    // Send back the response data
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error);
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({
        error: error.message,
        details: error.response?.data
      });
    } else {
      res.status(500).json({
        error: 'An unexpected error occurred'
      });
    }
  }
}