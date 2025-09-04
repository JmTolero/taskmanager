import axios from 'axios';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    const url = user_id
      ? `http://localhost:3000/api/tasks/${id}?user_id=${encodeURIComponent(user_id)}`
      : `http://localhost:3000/api/tasks/${id}`;

    const response = await axios.get(url);
    return Response.json(response.data, { status: response.status });
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal server error' };
    return Response.json(data, { status });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const body = await request.json();

    const url = user_id
      ? `http://localhost:3000/api/tasks/${id}?user_id=${encodeURIComponent(user_id)}`
      : `http://localhost:3000/api/tasks/${id}`;

    const response = await axios.patch(url, body, { headers: { 'Content-Type': 'application/json' } });
    return Response.json(response.data, { status: response.status });
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal server error' };
    return Response.json(data, { status });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    const url = user_id
      ? `http://localhost:3000/api/tasks/${id}?user_id=${encodeURIComponent(user_id)}`
      : `http://localhost:3000/api/tasks/${id}`;

    const response = await axios.delete(url);
    return Response.json(response.data, { status: response.status });
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal server error' };
    return Response.json(data, { status });
  }
}
