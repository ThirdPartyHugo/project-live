const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const DAILY_API_KEY = 'a348147f7783ebb909804647f627bde3d873524b919f41370182acc58f9d96fc';

app.post('/api/check-session', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ active: false, error: 'Token is required' });
  }

  try {
    // Fetch participants in the room
    const roomName = 'WorkEnLigne_Webinars'; // Replace with your room name
    const response = await axios.get(`https://api.daily.co/v1/rooms/${roomName}/participants`, {
      headers: {
        Authorization: `Bearer ${DAILY_API_KEY}`,
      },
    });

    const participants = response.data.participants;

    // Check if the token's `user_id` is already active
    const isActive = participants.some((participant) => participant.token === token);

    res.json({ active: isActive });
  } catch (error) {
    console.error('Error checking session:', error.message);
    res.status(500).json({ active: false, error: 'Failed to check session' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
