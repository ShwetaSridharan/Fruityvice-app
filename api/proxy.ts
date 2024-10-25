import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const AWS_LAMBDA_URL = "https://wcz3qr33kmjvzotdqt65efniv40kokon.lambda-url.us-east-2.on.aws";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await axios.get(AWS_LAMBDA_URL, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({
      error: 'Failed to fetch data from API'
    });
  }
}