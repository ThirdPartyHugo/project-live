const axios = require('axios');

const DAILY_API_KEY = 'a348147f7783ebb909804647f627bde3d873524b919f41370182acc58f9d96fc';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    res.status(200).json({ active: isActive });
  } catch (error) {
    console.error('Error checking session:', error.message);
    res.status(500).json({ active: false, error: 'Failed to check session' });
  }
};
