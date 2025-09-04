import axios from 'axios';

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await axios.post('http://localhost:3000/api/login', body);
    return Response.json(response.data, { status: response.status });
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal server error' };
    return Response.json(data, { status });
  }
}
